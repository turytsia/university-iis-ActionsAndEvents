import React from 'react'
import classes from "./Container.module.css"

type PropsType = {
    children: React.ReactNode
}

export const containerId: string = "pg-container"

const Container = ({ children }: PropsType) => {
    return (
        <div id={containerId} className={classes.container}>{children}</div>
    )
}

export default Container