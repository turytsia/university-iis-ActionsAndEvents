import React from 'react'
import classes from "./TicketInputs.module.css"
import { TicketType } from '../../Tickets/modals/CreateTicketModal/CreateTicketModal'
import Ticket from './components/Ticket/Ticket'
import NewTicket from './components/NewTicket/NewTicket'
import { TicketTypeWithRegister } from '../../Tickets/Tickets'
import uuid from 'react-uuid'

type PropsType = {
    tickets: TicketTypeWithRegister[],
    createTicket: (inputs: TicketTypeWithRegister) => void
    deleteTicket: (i: number) => () => void
    updateTicket: (i: number) => (input: TicketTypeWithRegister) => void
    enableNewTicket?: boolean
}

const TicketInputs = ({
    tickets,
    createTicket,
    deleteTicket,
    updateTicket,
    enableNewTicket
}: PropsType) => {
    
    return (
        <div className={classes.container}>
            {tickets.map((ticket, i) => <Ticket key={uuid()} ticket={ticket} deleteTicket={deleteTicket(ticket.id!)} updateTicket={updateTicket(ticket.id!)} />)}
            {enableNewTicket && <NewTicket createTicket={createTicket} />}
        </div>
    )
}

export default TicketInputs