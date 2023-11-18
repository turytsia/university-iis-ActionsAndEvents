import React, { useState } from 'react'
import classes from "./NewTicket.module.css"
import CreateTicketModal, { TicketType } from '../../../../Tickets/modals/CreateTicketModal/CreateTicketModal'

type PropsType = {
    createTicket: (inputs: TicketType) => void
}

const NewTicket = ({
    createTicket
}: PropsType) => {
    const [isActive, setIsActive] = useState(false)

    const onSubmit = (inputs: TicketType) => {
        createTicket(inputs)
        onClose()
    }

    const onClose = () => {
        setIsActive(false)
    }
  return (
      <>
          <button className={classes.empty} onClick={() => setIsActive(true)}>
              <span className={classes.border}>
                  <span>+</span>
              </span>
          </button>
          {isActive && (
              <CreateTicketModal onSubmit={onSubmit} onClose={onClose} />
          )}
      </>
  )
}

export default NewTicket