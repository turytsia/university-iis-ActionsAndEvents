import React, { useContext, useEffect, useState } from 'react'
import classes from "./Ticket.module.css"
import CreateTicketModal, { TicketType } from '../../../../Tickets/modals/CreateTicketModal/CreateTicketModal'
import NewTicket from '../NewTicket/NewTicket'
import ButtonIconOnly from '../../../../../../../components/ButtonIconOnly/ButtonIconOnly'
import icons from '../../../../../../../utils/icons'
import { Icon } from '@iconify/react'
import classNames from 'classnames'
import Button from '../../../../../../../components/Button/Button'
import ConfirmTicketModal from './ConfirmTicketModal/ConfirmTicketModal'
import { AppContext, LoadingType } from '../../../../../../../context/AppContextProvider'
import { TicketTypeWithRegister } from '../../../../Tickets/Tickets'
import { status } from '../../../../../../../utils/common'
import Popover from '../../../../../../../components/Popover/Popover'
import DeleteModal from '../../../../../../../modals/DeleteModal/DeleteModal'

type PropsType = {
    ticket: TicketTypeWithRegister
    deleteTicket?: () => void,
    updateTicket?: (inputs: TicketTypeWithRegister) => void
}

const Ticket = ({
    ticket: defaultTicket,
    deleteTicket,
    updateTicket,
}: PropsType) => {
    const [ticket, setTicket] = useState(defaultTicket)
 
    const context = useContext(AppContext)

    const [isActive, setIsAcitve] = useState(false)
    const [isGetActive, setIsGetActive] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(false)
    const [authorId, setAuthorId] = useState<number | null>(null)

    const fetchEvent = async () => {
        if (!ticket.eventId) return
        try {
            const response = await context.request!.get(`/event/${ticket.eventId}`)
            setAuthorId(response.data.authorId)
        } catch (error) {
            console.error(error)
        }
    }

    const onSubmit = (inputs: TicketTypeWithRegister) => {
        updateTicket!(inputs)
        onClose()
    }

    const submitDeletion = () => {
        deleteTicket!()
        setIsDeleteActive(false)
    }

    const onClose = () => {
        setIsAcitve(false)
    }

    const getTicket = async () => {
        context.setLoading(LoadingType.LOADING)
        try {
            const response = await context.request!.get(`/event/ticket/${ticket.id}/register/${context.user.id}`)
            setTicket(prev => ({ ...prev, status: status.PENDING }))
            setIsGetActive(false)
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    useEffect(() => {
        fetchEvent()
    }, [])

    useEffect(() => {
        setTicket(defaultTicket)
    }, [defaultTicket])

    const btnAction = (status: string) => {
        if (!ticket.id || context.user.id === authorId) {
            return (
                <>
                    {updateTicket && (
                        <Popover element={<ButtonIconOnly icon={icons.pen} onClick={() => setIsAcitve(true)}></ButtonIconOnly>}>
                            Update
                        </Popover>
                    )}
                    {deleteTicket && (
                        <Popover element={<ButtonIconOnly icon={icons.trash} onClick={() => setIsDeleteActive(true)}></ButtonIconOnly>}>
                            Delete
                        </Popover>
                    )}
                </>
            )
        }
        switch (status) {
            case "Rejected":
                return <>
                    <Popover element={
                        <ButtonIconOnly to={`/event/${ticket.eventId}`} icon={icons.link} iconWidth={20} iconHeight={20} />
                    }>
                        Open event
                    </Popover>
                    <Popover element={<Icon className={classes.rejected} icon={icons.cancel} width={25} height={25} />}>
                        You were rejected for this event
                    </Popover>
                </>
            case "Pending":
                return (
                    <>
                        <Popover element={
                            <ButtonIconOnly to={`/event/${ticket.eventId}`} icon={icons.link} iconWidth={20} iconHeight={20} />
                        }>
                            Open event
                        </Popover>
                        <Popover element={<Icon className={classes.pending} icon={icons.time} width={25} height={25} />}>
                            Pending...
                        </Popover>
                    </>
                )
            case "Accepted":
                return <>
                    <Popover element={
                        <ButtonIconOnly to={`/event/${ticket.eventId}`} icon={icons.link} iconWidth={20} iconHeight={20} />
                    }>
                        Open event
                    </Popover>
                    <Popover element={<Icon className={classes.accepted} icon={icons.checkCircle} width={25} height={25} />}>
                        You were accepted for this event
                    </Popover>
                </>
            default:
                return (
                    <Button style='invert' onClick={() => setIsGetActive(true)}>Get</Button>
                )
        }
    }

    return (
        <div className={classes.ticket}>

            <div className={classes.content}>
                <span className={classes.name}>{ticket.name}</span>
                <div className={classes.actions}>
                    {btnAction(ticket.status)}
                </div>
            </div>
            <p className={classes.description}>{ticket.description}</p>
            <div className={classes.footer}>
                <span className={classes.price}>
                    <Icon icon={icons.dollar} width={20} height={20} />
                    {ticket.price}
                </span>
                <span className={classes.capacity}>
                    <Popover element={<Icon icon={icons.users} width={20} height={20} />}>
                        Capacity
                    </Popover>
                    {ticket.capacity}
                </span>
            </div>
            <div>

            </div>
            {/* {ticket.id && (
                <Button style='invert' onClick={() => setIsGetActive(true)}>Get</Button>
            )} */}

            {isActive && (
                <CreateTicketModal onSubmit={onSubmit} onClose={onClose} defaultInputs={ticket} />
            )}
            {isGetActive && (
                <ConfirmTicketModal onSubmit={getTicket} onClose={() => setIsGetActive(false)} ticketName={ticket.name} eventName={'...'} />
            )}
            {isDeleteActive && (
                <DeleteModal title={`Delete ticket "${ticket.name}"?`} onSubmit={submitDeletion} onClose={() => setIsDeleteActive(false)} />
            )}
        </div>
    )
}

export default Ticket