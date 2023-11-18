import React, { useContext } from 'react'
import { AppContext } from '../../../../context/AppContextProvider'

const User = () => {

    const context = useContext(AppContext)

  return (
      <div>
          <p>Login {context.user.login}</p>
          <p>Email {context.user.email}</p>
      </div>
  )
}

export default User