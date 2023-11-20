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
import { AppContext } from '../../../../../../../context/AppContextProvider'
import { TicketTypeWithRegister } from '../../../../Tickets/Tickets'

type PropsType = {
    ticket: TicketTypeWithRegister
    deleteTicket?: () => void,
    updateTicket?: (inputs: TicketTypeWithRegister) => void
}

const Ticket = ({
    ticket,
    deleteTicket,
    updateTicket,
}: PropsType) => {

    const context = useContext(AppContext)

    const [isActive, setIsAcitve] = useState(false)
    const [isGetActive, setIsGetActive] = useState(false)
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

    const onClose = () => {
        setIsAcitve(false)
    }

    const getTicket = async () => {
        try {
            const response = await context.request!.get(`/event/ticket/${ticket.id}/register/${context.user.id}`)
            console.log(response.data)
            setIsGetActive(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchEvent()
    }, [])

    const btnAction = (status: string) => {
        if (!ticket.id || context.user.id === authorId) {
            return null
        }
        switch (status) {
            case "Rejected":
                return <>Rejected...</>
            case "Pending":
                return <>Pending...</>
            case "Accepted":
                return <>Accepted...</>
            default:
                return <Button style='invert' onClick={() => setIsGetActive(true)}>Get</Button>
        }
    }

    return (
        <div className={classes.ticket}>

            <div className={classes.actions}>
                {updateTicket && <ButtonIconOnly icon={icons.pen} onClick={() => setIsAcitve(true)}></ButtonIconOnly>}
                {deleteTicket && <ButtonIconOnly icon={icons.trash} onClick={deleteTicket}></ButtonIconOnly>}
                {btnAction(ticket.status)}
            </div>

            <div className={classes.content}>
                <span className={classes.name}>{ticket.name}</span>
                <p className={classes.description}>{ticket.description}</p>
            </div>
            <div className={classes.footer}>
                <span className={classes.price}>
                    $ {ticket.price}
                </span>
                <span className={classes.capacity}>
                    {ticket.capacity}
                    <Icon icon={icons.users} width={20} height={20} />
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
        </div>
    )
}

export default Ticket