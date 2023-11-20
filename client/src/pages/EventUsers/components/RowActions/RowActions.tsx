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
    const { id } = useParams()
    const context = useContext(AppContext)

    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const checkUser = async () => {
        try {
            ///event/ticket/registration/{id}
            const response = await context.request!.patch(`/event/ticket/registration/${user.id}/${user.ticketId}`, {
                userId: user.id,
                ticketId: user.ticketId,
                status: "Accepted",
                date: new Date()
            })
            setUsers(prev => prev.reduce((a, u) => [...a, u.id === user.id ? { ...user, status: "Accepted" } : u ], [] as UserWithStatus[]))
        } catch (error) {
            console.error(error)
        }
    }

    const deleteUser = async () => {
        try {
            const response = await context.request!.patch(`/event/ticket/registration/${user.id}/${user.ticketId}`, {
                userId: user.id,
                ticketId: user.ticketId,
                status: "Rejected",
                date: new Date()
            })
            setUsers(prev => prev.reduce((a, u) => [...a, u.id === user.id ? { ...user, status: "Rejected" } : u], [] as UserWithStatus[]))
            setIsDeleteActive(false)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <ButtonIconOnly onClick={checkUser} icon={icons.check}></ButtonIconOnly>
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