import React, { useContext } from 'react'
import { EventType } from '../../../../utils/types'

import classes from "./EventCard.module.css"
import { Icon } from '@iconify/react'
import icons from '../../../../utils/icons'
import Button from '../../../../components/Button/Button'
import { Link } from 'react-router-dom'
import ProfileCard from '../../../../components/ProfileCard/ProfileCard'
import { AppContext } from '../../../../context/AppContextProvider'

type PropsType = {
    event: EventType
}

const EventCard = ({
    event
}: PropsType) => {
    return (
        <div className={classes.container}>
            <div className={classes.preview} style={{ backgroundColor: "purple" }} >
                <ProfileCard className={classes.profile} user={{
                    id: null,
                    login: null,
                    firstname: null,
                    lastname: null,
                    phone: null,
                    email: "Author",
                    role: null
                }} />
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
                <Button to={`/events/${event.id}`}>Details</Button>
                <Button style='invert'>Buy tickets</Button>
            </div>
        </div>
    )
}

export default EventCard