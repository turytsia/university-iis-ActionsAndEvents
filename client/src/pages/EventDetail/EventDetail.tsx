import React, { useContext, useEffect, useState } from 'react'
import PageView from '../../components/PageView/PageView'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContextProvider'
import { EventType } from '../../utils/types'

import classes from "./EventDetail.module.css"
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import Textarea from '../../components/Textarea/Textarea'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { SpringResponseType } from '../../utils/common'
import { TicketType } from '../CreateEvent/pages/Tickets/modals/CreateTicketModal/CreateTicketModal'
import Ticket from '../CreateEvent/pages/components/TicketInputs/components/Ticket/Ticket'
import EventUpdateModal from './modals/EventUpdateModal/EventUpdateModal'
import EventDeleteModal from './modals/EventDeleteModal/EventDeleteModal'

const EventDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const context = useContext(AppContext)

    const [event, setEvent] = useState<EventType | null>(null)
    const [tickets, setTickets] = useState<TicketType[]>([])
    const [isUpdateActive, setIsUpdateActive] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const fetch = async () => {
        try {
            const response = await context.request!.get(`/event/${id}`)

            const ticketsResponse = await context.request!.get(`/event/${id}/tickets`)

            const ticketResponses = await Promise.allSettled(
                ticketsResponse.data.tickets.map(async (ticketId: number) => await context.request!.get(`/event/ticket/${ticketId}`))
            );

            const fulfilledResponses = ticketResponses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<TicketType>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);
            
            setTickets(fulfilledResponses.map(({ data }) => data))
            setEvent(response.data)

            const usersResponse = await context.request!.get(`/event/${response.data.id}/users`)
            console.log(usersResponse.data)
        } catch (error) {
            navigate("/")
        }
    }

    const updateEvent = async (event: EventType) => {
        try {
            const response = await context.request!.patch(`/event/${id}`, event)
            setEvent(event)
            setIsUpdateActive(false)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEvent = async () => {
        try {
            const response = await context.request!.delete(`/event/${id}`)

            setIsDeleteActive(false)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    if (event === null) {
        return null;
    }
    
    return (
        <PageView scroll title={event.title}>
            <div className={classes.container}>
                <div className={classes.preview} style={{ backgroundColor: "purple" }} />
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.date}>
                            <Icon icon={icons.calendar} width={20} height={20} />
                            <span>{event.dateFrom}</span>
                            <span>-</span>
                            <span>{event.dateTo}</span>
                        </div>
                        <div className={classes.actions}>
                            {context.user.id === event.author.id && (
                                <>
                                    <Button onClick={() => setIsUpdateActive(true)}>
                                        <Icon icon={icons.pen} width={20} height={20} />
                                        Update
                                    </Button>
                                    <Button style='invert' onClick={() => setIsDeleteActive(true)}>
                                        <Icon icon={icons.trash} width={20} height={20} />
                                        Remove
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={classes.section}>
                        <h4 className={classes.title}>Description</h4>
                        <p className={classes.description}>{event.description}</p>
                    </div>
                    <div className={classes.section}>
                        <h4 className={classes.title}>Tickets</h4>
                        <div className={classes.tickets}>
                            {tickets.map(ticket => <Ticket ticket={ticket} />)}
                        </div>
                    </div>
                    <div className={classes.section}>
                        <h4 className={classes.title}>Managed by</h4>
                        <ProfileCard className={classes.profile} user={event.author} />
                    </div>
                </div>
            </div>
            <div className={classes.comment}>
                <h4 className={classes.title}>Comment as {context.user.email}</h4>
                <div>
                    <Textarea value={''} />
                </div>
            </div>
            {isUpdateActive && (
                <EventUpdateModal event={event} onClose={() => setIsUpdateActive(false)} onSubmit={updateEvent} />
            )}
            {isDeleteActive && (
                <EventDeleteModal onClose={() => setIsDeleteActive(false)} onSubmit={deleteEvent} />
            )}
        </PageView>
    )
}

export default EventDetail