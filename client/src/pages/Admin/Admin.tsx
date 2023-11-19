import React from 'react'
import classes from "./Admin.module.css"
import { Link, Outlet } from 'react-router-dom'
import Tabs, { TabsType } from '../../components/Tabs/Tabs'
import PageView from '../../components/PageView/PageView'

const tabs: TabsType = [
    {
        to: "",
        text: "Categories"
    },
    {
        to: "places",
        text: "Places"
    },
    {
        to: "users",
        text: "Users"
    }
]

const Admin = () => {
    return (
        <PageView title="Admin">
            <Tabs prefix='/admin' tabs={tabs} />
            <Outlet />
        </PageView>
    )
}

export default Admin