import React, { useContext, useState } from 'react'
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

type PropsType = {
    ticket: TicketType
    deleteTicket?: () => void,
    updateTicket?: (inputs: TicketType) => void
}

const Ticket = ({
    ticket,
    deleteTicket,
    updateTicket,
}: PropsType) => {

    const context = useContext(AppContext)

    const [isActive, setIsAcitve] = useState(false)
    const [isGetActive, setIsGetActive] = useState(false)

    const onSubmit = (inputs: TicketType) => {
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

    return (
        <div className={classes.ticket}>
            {!ticket.id && (
                <div className={classes.actions}>
                    {updateTicket && <ButtonIconOnly icon={icons.pen} onClick={() => setIsAcitve(true)}></ButtonIconOnly>}
                    {deleteTicket && <ButtonIconOnly icon={icons.trash} onClick={deleteTicket}></ButtonIconOnly>}
                </div>
            )}
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
            {ticket.id && (
                <Button style='invert' onClick={() => setIsGetActive(true)}>Get</Button>
            )}
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