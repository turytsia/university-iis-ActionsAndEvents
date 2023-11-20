import React, { useContext, useEffect, useState } from 'react'
import PageView from '../../components/PageView/PageView'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext, UserType } from '../../context/AppContextProvider'
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
import Tabs, { TabsType } from '../../components/Tabs/Tabs'
import { TicketTypeWithRegister } from '../CreateEvent/pages/Tickets/Tickets'

const EventDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const context = useContext(AppContext)

    const [event, setEvent] = useState<EventType | null>(null)
    const [tickets, setTickets] = useState<TicketTypeWithRegister[]>([])
    const [author, setAuthor] = useState<UserType | null>(null)
    const [isUpdateActive, setIsUpdateActive] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const fetch = async () => {
        try {
            const response = await context.request!.get(`/event/${id}`)

            const ticketsResponse = await context.request!.get(`/event/${id}/tickets`)

            const authorResponse = await context.request!.get(`/user/${response.data.authorId}`)

            const ticketResponses = await Promise.allSettled(
                ticketsResponse.data.tickets.map(async (ticketId: number) => await context.request!.get(`/event/ticket/${ticketId}`))
            );

            const registersResponses = await Promise.allSettled(
                ticketsResponse.data.tickets.map(async (id: number) => await context.request!.get(`user/${context.user.id}/ticket/${id}`))
            );

            const registersFulfilledResponses = registersResponses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<{ ticketId: number, date: string, status: string, userId: number }>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);

            const ticketFulfilledResponses = ticketResponses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<TicketType>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);           

            setTickets(ticketFulfilledResponses.map(({ data: ticket }) => {
                const entry = registersFulfilledResponses.map(({ data }) => data).find(({ ticketId }) => ticket.id! === ticketId!)

                if (entry) {
                    return { ...ticket, date: entry?.date, status: entry?.status }
                } else {
                    return { ...ticket, date: "", status: "" }
                }
            }))
            setAuthor(authorResponse.data)
            setEvent(response.data)
        } catch (error) {
            console.error(error)
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

    // const entry = users.find(({ user }) => user.id === context.user.id)

    return (
        <>
            <div className={classes.container}>
                <div className={classes.preview} style={{ backgroundColor: "purple" }} />
                <div className={classes.content}>
                    <div className={classes.header}>
                        <h2>{event.title}</h2>
                        <div className={classes.actions}>
                            {context.user.id === event.authorId && (
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
                    <div className={classes.date}>
                        <Icon icon={icons.calendar} width={20} height={20} />
                        <span>{event.dateFrom}</span>
                        <span>-</span>
                        <span>{event.dateTo}</span>
                    </div>
                    <div className={classes.section}>
                        <h4 className={classes.title}>Description</h4>
                        <p className={classes.description}>{event.description}</p>
                    </div>
                    <div className={classes.section}>
                        <h4 className={classes.title}>Tickets</h4>
                        <div className={classes.tickets}>
                            {tickets.map(ticket => <Ticket key={ticket.id} ticket={ticket} />)}
                        </div>
                    </div>
                    <div className={classes.section}>
                        <h4 className={classes.title}>Managed by</h4>
                        {author && <ProfileCard className={classes.profile} user={author} />}
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
        </>
    )
}

export default EventDetail