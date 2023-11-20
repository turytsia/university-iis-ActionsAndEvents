import React, { useContext, useEffect, useState } from 'react'
import { EventType } from '../../../../utils/types'

import classes from "./EventCard.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import Button from '../../../../components/Button/Button'
import { Link } from 'react-router-dom'
import ProfileCard from '../../../../components/ProfileCard/ProfileCard'
import { AppContext, UserType } from '../../../../context/AppContextProvider'

type PropsType = {
    event: EventType
}

const EventCard = ({
    event
}: PropsType) => {

    const context = useContext(AppContext)

    const [author, setAuthor] = useState<UserType | null>(null)

    const fetchAuthor = async () => {
        try {
            const response = await context.request!.get(`/user/${event.authorId}`)
            setAuthor(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAuthor()
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.preview} style={{ backgroundColor: "purple" }} >
                {author && <ProfileCard className={classes.profile} user={author} />}
            </div>
            <div className={classes.header}>
                <h2>{event.title}</h2>
            </div>
            <div className={classes.date}>
                <span className={classes.info}>
                    <Icon icon={icons.calendar} width = {20} height={20} />
                    {event.dateFrom} - {event.dateTo}
                </span>
                <span className={classes.info}>
                    <Icon icon={icons.time} width={20} height={20} />
                    15:00 PM
                </span>
            </div>
            <div className={classes.location}>
                <span className={classes.info}>
                    <Icon icon={icons.location} width={20} height={20} />
                    Location
                </span>
            </div>
            <div className={classes.actions}>
                <Button style='invert' to={`/events/${event.id}`}>Details</Button>
            </div>
        </div>
    )
}

export default EventCard