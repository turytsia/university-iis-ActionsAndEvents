import React, { useState } from 'react'
import Modal from '../../../../../../components/Modal/Modal'
import icons from '../../../../../../utils/icons'
import Input from '../../../../../../components/Input/Input'
import Textarea from '../../../../../../components/Textarea/Textarea'
import { TicketTypeWithRegister } from '../../Tickets'

type PropsType = {
    defaultInputs?: TicketTypeWithRegister
    onClose: () => void,
    onSubmit: (inputs: TicketTypeWithRegister) => void,
}

export type TicketType = {
    id: number | null
    name: string,
    price: string,
    capacity: string,
    description: string
    eventId: number | null
}

const initialInputs: TicketTypeWithRegister = {
    id: null,
    name: "",
    price: "",
    capacity: "",
    description: "",
    date: "",
    status: "",
    eventId: null
}

const CreateTicketModal = ({
    defaultInputs,
    onClose,
    onSubmit,
}: PropsType) => {
    const [inputs, setInputs] = useState(defaultInputs ?? initialInputs)

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const __onSubmit = () => {
        onSubmit(inputs)
    }

    return (
        <Modal title="Create new ticket"
            textProceed="Save"
            textCancel="Cancel"
            onClose={onClose}
            onSubmit={__onSubmit}
            icon={icons.sun}>
            <Input label='Name' name='name' value={inputs.name} onChange={onChange} />
            <Input label='Price' name='price' value={inputs.price} onChange={onChange} />
            <Input label='Capacity' name='capacity' value={inputs.capacity} onChange={onChange} />
            <Textarea label='Description' name='description' value={inputs.description} onChange={onChange} />
        </Modal>
    )
}

export default CreateTicketModal