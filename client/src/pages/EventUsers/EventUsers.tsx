import React, { useContext, useEffect, useState } from 'react'
import TableView from '../../components/TableView/TableView'
import { AppContext, UserType } from '../../context/AppContextProvider'
import { useParams } from 'react-router-dom'
import { SpringResponseType } from '../../utils/common'
import Table, { TableHeaderType } from '../../components/Table/Table'
import RowActions from './components/RowActions/RowActions'
import { TicketType } from '../CreateEvent/pages/Tickets/modals/CreateTicketModal/CreateTicketModal'

export type UserWithStatus = UserType & { status: string, ticketId: number }

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

            const ticketsResponse = await context.request!.get(`/event/${id}/tickets`)

            const registersResponses = await Promise.allSettled(
                ticketsResponse.data.tickets.map(async (id: number) => await context.request!.get(`/event/ticket/${id}/registrations`))
            );

            const registersFulfilledResponses = registersResponses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<{ ticketId: number, date: string, status: string, userId: number }>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);

            const usersResponses = await Promise.allSettled(
                registersFulfilledResponses.map(async ({ data }) => await context.request!.get(`/user/${data.userId}`))
            );

            const usersFulfilledResponses = usersResponses
                .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);

            setUsers(registersFulfilledResponses.map(({ data }) => {
                const { userId, status, ticketId } = data

                const user = usersFulfilledResponses.map(({ data }) => data).find(({ id }) => id === userId)

                return { ...user, status, ticketId }
            }))
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