import React, { useContext } from 'react'
import { AppContext } from '../../../../context/AppContextProvider'

import classes from "./User.module.css"

const User = () => {

    const context = useContext(AppContext)

    return (
        <div className={classes.container}>
            <div className={classes.avaContainer}>
                <div className={classes.ava} />
            </div>
            <div className={classes.detailsContainer}>
                <p className={classes.details}>
                    <span>Login</span>
                    {context.user.login}
                </p>
                <p className={classes.details}>
                    <span>Email</span>
                    {context.user.email}
                </p>
                <p className={classes.details}>
                    <span>Name</span>
                    {context.user.firstname}
                </p>
                <p className={classes.details}>
                    <span>Surname</span>
                    {context.user.lastname}
                </p>
                <p className={classes.details}>
                    <span>Phone</span>
                    {context.user.phone}
                </p>

                <p className={classes.details}>
                    <span>Role</span>
                    {context.user.role}
                </p>
            </div>
        </div>
    )
}

export default User