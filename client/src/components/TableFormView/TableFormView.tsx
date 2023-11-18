import React from 'react'
import classes from "./TableFormView.module.css"

type PropsType = {
    children: React.ReactNode
}

const TableFormView = ({
    children
}: PropsType) => {
  return (
      <div className={classes.container}>{children}</div>
  )
}

export default TableFormView