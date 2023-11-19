import React, { useContext, useState } from 'react'
import { UserWithStatus } from '../../EventUsers'
import ButtonIconOnly from '../../../../components/ButtonIconOnly/ButtonIconOnly'
import icons from '../../../../utils/icons'
import { AppContext } from '../../../../context/AppContextProvider'
import { useParams } from 'react-router-dom'
import DeleteModal from '../../../../modals/DeleteModal/DeleteModal'

type PropsType = {
    user: UserWithStatus,
    users: UserWithStatus[],
    setUsers: React.Dispatch<React.SetStateAction<UserWithStatus[]>>
}

const RowActions = ({
    user,
    users,
    setUsers
}: PropsType) => {
    const {id} = useParams()
    const context = useContext(AppContext)

    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const checkUser = async () => {
        try {
            // const response = await context.request!.get(`/event/{id}/user/{userId}`)
        } catch (error) {

        }
    }

    const deleteUser = async () => {
        try {
            const response = await context.request!.delete(`/event/${id}/user/${user.id}`)
            console.log(response.data)
            setUsers(prev => prev.filter(({ id }) => id !== user.id))
        } catch (error) {
            console.error(error)
        }
    }
  return (
      <>
          <ButtonIconOnly icon={icons.check}></ButtonIconOnly>
          <ButtonIconOnly onClick={() => setIsDeleteActive(true)} icon={icons.close}></ButtonIconOnly>
          {isDeleteActive && (
              <DeleteModal
                  title={`Dismiss user "${user.login}"?`}
                  onSubmit={deleteUser}
                  onClose={() => setIsDeleteActive(false)}
              />
          )}
      </>
  )
}

export default RowActions