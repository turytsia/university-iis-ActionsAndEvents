import React, { useContext, useEffect, useState } from 'react'
import TableView from '../../components/TableView/TableView'
import { AppContext, UserType } from '../../context/AppContextProvider'
import { useParams } from 'react-router-dom'
import { SpringResponseType } from '../../utils/common'
import Table, { TableHeaderType } from '../../components/Table/Table'
import RowActions from './components/RowActions/RowActions'

export type UserWithStatus = UserType & { status: string }

const dataKeys: TableHeaderType = {
    id: "Id",
    login: "Login",
    email: "E-mail",
    firstname: "Firstname",
    lastname: "Lastname",
    phone: "Phone",
    roles: "Role",
    status: "Status",
}

const EventUsers = () => {
    const { id } = useParams()
    const context = useContext(AppContext)

    const [users, setUsers] = useState<UserWithStatus[]>([])

    const fetch = async () => {
        try {
            const response = await context.request!.get<{ userRegisters: { user: UserType, status: string }[] }>(`/event/${id}/users`)

            setUsers(response.data.userRegisters.map(({ user, status }) => ({ ...user, status })))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <TableView>
            <Table
                rowActions={(user) => (
                    <RowActions
                        user={user}
                        users={users}
                        setUsers={setUsers}
                    />
                )}
                dataKeys={dataKeys}
                data={users}
            />
        </TableView>
    )
}

export default EventUsers