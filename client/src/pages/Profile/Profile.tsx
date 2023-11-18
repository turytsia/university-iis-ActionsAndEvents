import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import { Link, Outlet } from 'react-router-dom'
import Tabs, { TabsType } from '../../components/Tabs/Tabs'
import PageView from '../../components/PageView/PageView'

import classes from "./Profile.module.css"

const tabs: TabsType = [
    {
        to: "",
        text: "User"
    },
    {
        to: "events",
        text: "Events"
    }
]

const Profile = () => {
    const context = useContext(AppContext)
    return (
        <PageView title="Profile">
            <Tabs tabs={tabs} />
            <div className={classes.outlet}>
                <Outlet />
            </div>
        </PageView>
    )
}

export default Profile