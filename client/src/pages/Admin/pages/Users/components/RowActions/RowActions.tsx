import React, { useContext, useState } from 'react'
import ButtonIconOnly from '../../../../../../components/ButtonIconOnly/ButtonIconOnly'
import icons from '../../../../../../utils/icons'
import DeleteModal from '../../../../../../modals/DeleteModal/DeleteModal'
import { UserType } from '../../Users'
import { AppContext } from '../../../../../../context/AppContextProvider'

type PropsType = {
    user: UserType
    users: UserType[]
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>
}

const RowActions = ({
    user,
    users,
    setUsers
}: PropsType) => {
    const context = useContext(AppContext)

    const [isDeleteActive, setIsDeleteActive] = useState(false)

    if (user.id === context.user.id || user.role === "ROLE_ADMIN") {
        return null;
    }

    const deleteCategory = async () => {
        try {
            const response = await context.request!.delete(`/user/${user.id}`)

            setUsers(prev => prev.filter(({ id }) => id !== user.id))
            setIsDeleteActive(false)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <ButtonIconOnly icon={icons.trash} onClick={() => setIsDeleteActive(true)}></ButtonIconOnly>
            {isDeleteActive && (
                <DeleteModal
                    title={`Delete user "${user.login}"?`}
                    onSubmit={deleteCategory}
                    onClose={() => setIsDeleteActive(false)}
                />
            )}
        </>
    )
}

export default RowActions