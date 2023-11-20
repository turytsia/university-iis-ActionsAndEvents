import React from 'react'
import classes from "./TicketInputs.module.css"
import { TicketType } from '../../Tickets/modals/CreateTicketModal/CreateTicketModal'
import Ticket from './components/Ticket/Ticket'
import NewTicket from './components/NewTicket/NewTicket'
import { TicketTypeWithRegister } from '../../Tickets/Tickets'

type PropsType = {
    tickets: TicketTypeWithRegister[],
    setTickets: React.Dispatch<React.SetStateAction<TicketTypeWithRegister[]>>
}

const TicketInputs = ({
    tickets,
    setTickets
}: PropsType) => {

    const createTicket = (inputs: TicketTypeWithRegister) => {
        setTickets(prev => [...prev, inputs])
    }

    const deleteTicket = (i: number) => () => {
        setTickets(prev => prev.filter((_, __i) => __i !== i))
    }

    const updateTicket = (i: number) => (input: TicketTypeWithRegister) => {
        setTickets(prev => prev.reduce((a, t, __i) => [...a, __i === i ? input : t], [] as TicketTypeWithRegister[]))
    }
    
    return (
        <div className={classes.container}>
            {tickets.map((ticket, i) => <Ticket ticket={ticket} deleteTicket={deleteTicket(i)} updateTicket={updateTicket(i)} />)}
            <NewTicket createTicket={createTicket} />
        </div>
    )
}

export default TicketInputs