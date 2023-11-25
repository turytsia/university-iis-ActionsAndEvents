import React, { useContext, useEffect, useState } from 'react'
import PageView from '../../components/PageView/PageView'
import { useNavigate, useParams } from 'react-router-dom'
import AppContextProvider, { AppContext, LoadingType, UserType } from '../../context/AppContextProvider'
import { EventType } from '../../utils/types'

import classes from "./EventDetail.module.css"
import Button from '../../components/Button/Button'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import Textarea from '../../components/Textarea/Textarea'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import { SpringResponseType, formatDate } from '../../utils/common'
import { TicketType } from '../CreateEvent/pages/Tickets/modals/CreateTicketModal/CreateTicketModal'
import Ticket from '../CreateEvent/pages/components/TicketInputs/components/Ticket/Ticket'
import EventUpdateModal from './modals/EventUpdateModal/EventUpdateModal'
import EventDeleteModal from './modals/EventDeleteModal/EventDeleteModal'
import Tabs, { TabsType } from '../../components/Tabs/Tabs'
import { TicketTypeWithRegister } from '../CreateEvent/pages/Tickets/Tickets'
import axios from 'axios'
import styles from './EventDetail.module.css';
import TicketInputs from '../CreateEvent/pages/components/TicketInputs/TicketInputs'


type CommentType = {
    "id": number,
    // "user": UserType,
    // "event": EventType,
    "user": string,
    "date": string,
    "rating": number,
    "text": string
}

const EventDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const context = useContext(AppContext)

    const [event, setEvent] = useState<EventType | null>(null)
    const [tickets, setTickets] = useState<TicketTypeWithRegister[]>([])
    const [author, setAuthor] = useState<UserType | null>(null)
    const [isUpdateActive, setIsUpdateActive] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState<CommentType[]>([])
    const [rating, setRating] = useState(0)


    const fetch = async () => {
        context.setLoading(LoadingType.FETCHING)
        try {
            const response = await context.request!.get(`/event/${id}`)

            const ticketsResponse = await context.request!.get(`/event/${id}/tickets`)

            const authorResponse = await context.request!.get(`/user/${response.data.authorId}`)

            const ticketResponses = await Promise.allSettled(
                ticketsResponse.data.tickets.map(async (ticketId: number) => await context.request!.get(`/event/ticket/${ticketId}`))
            );


            const registersResponses = await Promise.allSettled(
                ticketsResponse.data.tickets.map(async (id: number) => await context.request!.get(`/event/ticket/${id}/registrations`))
            );
            ///event/ticket/registration/{id}
            const registersFulfilledResponses = registersResponses
                .filter((r): r is PromiseFulfilledResult<{ data: { registers: number[] } }> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);


            const registersDataResponses = await Promise.allSettled(
                registersFulfilledResponses.flatMap(({ data }) => data.registers).map(async (id: number) => await context.request!.get(`/event/ticket/registration/${id}`))
            )

            const registersDataFulfilledResponses = registersDataResponses
                .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);


            const ticketFulfilledResponses = ticketResponses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<TicketType>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);

            setTickets(ticketFulfilledResponses.map(({ data: ticket }) => {
                const entry = registersDataFulfilledResponses.map(({ data }) => data).filter(registers => registers.userId === context.user.id).find(({ ticketId }) => ticket.id! === ticketId!)

                if (entry) {
                    return { ...ticket, date: entry?.date, status: entry?.status }
                } else {
                    return { ...ticket, date: "", status: "" }
                }
            }))
            setAuthor(authorResponse.data)
            setEvent(response.data)

            const commentsResponse = await context.request!.get(`/event/${id}/comments`)

            const commentsResponses = await Promise.allSettled(
                commentsResponse.data.comments.map(async (commentId: number) => await context.request!.get(`/event/comment/${commentId}`))
            );

            const fulfilledCommentsResponses = commentsResponses
                .map((r) => r.status === 'fulfilled' ? r.value : null)
                .filter((v) => v !== null);


            setComments(fulfilledCommentsResponses.map(({ data }) => data))
        } catch (error) {
            console.error(error)
            navigate("/")
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    const updateEvent = async (event: EventType) => {
        context.setLoading(LoadingType.LOADING)
        try {
            const response = await context.request!.patch(`/event/${id}`, event)
            setEvent(event)
            setIsUpdateActive(false)
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    const deleteEvent = async () => {
        context.setLoading(LoadingType.LOADING)
        try {
            const response = await context.request!.delete(`/event/${id}`)

            setIsDeleteActive(false)
            navigate("/")
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    const updateTicket = (id: number) => async (inputs: TicketTypeWithRegister) => {
        context.setLoading(LoadingType.LOADING)
        try {
            const response = await context.request!.patch(`/event/ticket/${inputs.id}`, {
                name: inputs.name,
                capacity: Number(inputs.capacity),
                price: Number(inputs.price),
                description: inputs.description,
            })
            setTickets(prev => prev.map((ticket) => ticket.id === inputs.id ? inputs : ticket))
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    const createTicket = async(inputs: TicketTypeWithRegister) => {
        context.setLoading(LoadingType.LOADING)
        try {
            const response = await context.request!.post(`/event/${id}/ticket`, {
                name: inputs.name,
                capacity: Number(inputs.capacity),
                price: Number(inputs.price),
                description: inputs.description,
            })
            setTickets(prev => [...prev, inputs])
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    const deleteTicket = (id: number) => {
        return async () => {
            context.setLoading(LoadingType.LOADING)
            try {
                const response = await context.request!.delete(`/event/ticket/${id}`)
                setTickets(prev => prev.filter((ticket) => ticket.id !== id))
            } catch (error) {
                console.error(error)
            } finally {
                context.setLoading(LoadingType.NONE)
            }
        }
    }

    const handleRatingChange = (newRating: number) => {
        setRating(newRating)
    }

    const handleCommentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
    }

    const handleCommentSubmit = async () => {
        context.setLoading(LoadingType.LOADING)
        try {
            await context.request!.post(`/event/${id}/comment`, {
                text: comment,
                date: new Date(),
                rating: rating
            })
        } catch (error) {
            console.error('Failed to submit comment:', error)
        } finally {
            context.setLoading(LoadingType.NONE)
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
                        <span>{formatDate(event.dateFrom)}</span>
                        {event.dateTo && (
                            <>
                                <span>-</span>
                                <span>{formatDate(event.dateTo)}</span>
                            </>
                        )}
                    </div>
                    <div className={classes.section}>
                        <h3 className={classes.title}>Description</h3>
                        <p className={classes.description}>{event.description}</p>
                    </div>
                    <div className={classes.section}>
                        <h3 className={classes.title}>Tickets</h3>
                        <TicketInputs
                            tickets={tickets}
                            createTicket={createTicket}
                            updateTicket={updateTicket}
                            deleteTicket={deleteTicket}
                            enableNewTicket={context.user.id === event.authorId}
                        />
                    </div>
                    <div className={classes.section}>
                        <h3 className={classes.title}>Managed by</h3>
                        {author && <ProfileCard className={classes.profile} user={author} />}
                    </div>
                </div>
            </div>
            <div className={classes.comment}>
                {context.isAuth && (
                    <>
                        <h3 className={classes.title}>Comment as {context.user.email}</h3>
                        <div>
                            <Textarea value={comment} onChange={handleCommentChange} />
                            <div>
                                {
                                    [...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <label key={i} style={{ cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    value={ratingValue}
                                                    onClick={() => handleRatingChange(ratingValue)}
                                                    style={{ display: 'none' }}
                                                />
                                                <span className={ratingValue <= rating ? styles['filled-star'] : styles['empty-star']}
                                                    style={{ fontSize: '2em' }}
                                                >
                                                    &#9733;
                                                </span>
                                            </label>
                                        );
                                    }
                                    )}
                            </div>
                            <Button onClick={handleCommentSubmit}>Submit</Button>
                        </div>
                    </>
                )}
                <div>
                    {comments.map((comment) => (
                        <div className={classes.comment} key={comment.id}>
                            <div className={classes.commentHeader}>
                                <p>{formatDate(comment.date)}</p>
                                <h4>{comment.user}</h4>
                                <div className={classes.stars}>
                                    {[...Array(5)].map((star, i) => {
                                        const ratingValue = i + 1;
                                        return (
                                            <label key={i} style={{ cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    value={ratingValue}
                                                    checked={ratingValue === comment.rating}
                                                    readOnly
                                                    style={{ display: 'none' }}
                                                />
                                                <span
                                                    className={ratingValue <= comment.rating ? styles['filled-star'] : styles['empty-star']}
                                                    style={{ fontSize: '2em' }}
                                                >
                                                    &#9733;
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <Textarea value={comment.text} readOnly />
                            </div>
                        </div>
                    ))}
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