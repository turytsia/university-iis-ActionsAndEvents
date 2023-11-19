import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Tabs, { TabsType } from '../../components/Tabs/Tabs'
import PageView from '../../components/PageView/PageView'

const tabs: TabsType = [
  {
    to: "",
    text: "Event"
  },
  {
    to: "users",
    text: "Users"
  }
]

const EventView = () => {
  const {id} = useParams()

  return (
    <PageView scroll title="Event details">
      <Tabs tabs={tabs} prefix={`/events/${id}`} />
      <Outlet />
    </PageView>
  )
}

export default EventView