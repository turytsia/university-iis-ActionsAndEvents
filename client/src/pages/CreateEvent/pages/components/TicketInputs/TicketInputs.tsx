import React from 'react'
import classes from "./TicketInputs.module.css"
import { TicketType } from '../../Tickets/modals/CreateTicketModal/CreateTicketModal'
import Ticket from './components/Ticket/Ticket'
import NewTicket from './components/NewTicket/NewTicket'

type PropsType = {
    tickets: TicketType[],
    setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>
}

const TicketInputs = ({
    tickets,
    setTickets
}: PropsType) => {

    const createTicket = (inputs: TicketType) => {
        setTickets(prev => [...prev, inputs])
    }

    const deleteTicket = (i: number) => () => {
        setTickets(prev => prev.filter((_, __i) => __i !== i))
    }

    const updateTicket = (i: number) => (input: TicketType) => {
        setTickets(prev => prev.reduce((a, t, __i) => [...a, __i === i ? input : t], [] as TicketType[]))
    }
    
    return (
        <div className={classes.container}>
            {tickets.map((ticket, i) => <Ticket ticket={ticket} deleteTicket={deleteTicket(i)} updateTicket={updateTicket(i)} />)}

            <NewTicket createTicket={createTicket} />
        </div>
    )
}

export default TicketInputs