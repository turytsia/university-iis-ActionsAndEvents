import React from 'react'
import { Link } from 'react-router-dom'

import classes from "./Tabs.module.css"

export type TabsType = {
    to: string,
    text: string
}[]

type PropsType = {
    tabs: TabsType
}

const Tabs = ({
    tabs
}: PropsType) => {
  return (
      <div className={classes.tabs}>
          {tabs.map(({ to, text }) => <Link to={to}>{text}</Link>)}
      </div>
  )
}

export default Tabs