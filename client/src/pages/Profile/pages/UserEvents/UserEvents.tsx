import React from 'react'
import { Link } from 'react-router-dom'

const UserEvents = () => {
  return (
      <div>
          UserEvents
          <Link to="/events/create">Create new event</Link>
    </div>
  )
}

export default UserEvents