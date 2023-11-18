import React, { useContext, useState } from 'react'
import CreateTicketModal, { TicketType } from './modals/CreateTicketModal/CreateTicketModal'
import { AppContext } from '../../../../context/AppContextProvider'

const Tickets = () => {
    const context = useContext(AppContext)
    const [isCreateModal, setIsCreateModal] = useState(false)

    const onSubmit = (inputs: TicketType) => {
        try {
            // const response = context.request.post("/")
        } catch (error) {
            console.error(error)
        }
    }

return (
        <div>
            <button onClick={() => setIsCreateModal(true)}>Create ticket</button>
            Tickets
            {isCreateModal && (
                <CreateTicketModal
                    onSubmit={onSubmit}
                    onClose={() => setIsCreateModal(false)}
                />
            )}
        </div>
    )
}

export default Tickets