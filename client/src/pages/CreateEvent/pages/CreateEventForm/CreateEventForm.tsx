import React, { useContext, useEffect, useState } from 'react'
import Input from '../../../../components/Input/Input'
import Textarea from '../../../../components/Textarea/Textarea'
import ReactDatePicker from 'react-datepicker'
import DateInput, { DateChangeType } from '../../../../components/DateInput/DateInput'
import TicketInputs from '../components/TicketInputs/TicketInputs'

import classes from "./CreateEventForm.module.css"
import { TicketType } from '../Tickets/modals/CreateTicketModal/CreateTicketModal'
import { AppContext, LoadingType } from '../../../../context/AppContextProvider'
import { ResponseMessageType, SpringResponseType } from '../../../../utils/common'
import { AxiosResponse } from 'axios'
import { PlaceType, placesToDropdown } from '../../../Admin/pages/Places/Places'
import { CategoryType, categoriesToDropdown } from '../../../Admin/pages/Categories/Categories'
import InputLabel from '../../../../components/InputLabel/InputLabel'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import Button from '../../../../components/Button/Button'
import { TicketTypeWithRegister } from '../Tickets/Tickets'
import StarRequire from '../../../../components/StarRequire/StarRequire'
import { useNavigate } from 'react-router'

const initialInputs = {
    title: "",
    description: "",
    dateFrom: "",
    dateTo: "",
    category: null,
    place: null
}

const isEmpty = (inputs: typeof initialInputs): boolean => {

    return (
        inputs.title.length === 0 ||
        inputs.dateFrom.length === 0 ||
        inputs.category === null ||
        inputs.place === null
    )
}

const isTicketsEmpty = (tickets: TicketTypeWithRegister[]): boolean => {
    if (tickets.length === 0) return true

    return tickets.some(ticket => (
        ticket.name.length === 0 ||
        ticket.price.length === 0 ||
        ticket.capacity.length === 0
    ))
}

const CreateEventForm = () => {

    const navigate = useNavigate()

    const context = useContext(AppContext)

    const [inputs, setInputs] = useState(initialInputs)
    const [tickets, setTickets] = useState<TicketTypeWithRegister[]>([])
    const [places, setPlaces] = useState<PlaceType[]>([])
    const [categories, setCategories] = useState<CategoryType[]>([])

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onDateChange: DateChangeType = (name, value) => {

        setInputs(prev => ({ ...prev, [name]: value?.toISOString() }))
    }

    const onDropdownChange = (value: string | number, name: string) => {
        setInputs(prev => ({ ...prev, [name]: value }))
    }

    const fetchPlaces = async () => {
        const response = await context.request!.get("/places")

        const responses = await Promise.allSettled(
            response.data.places.map(async (id: number) => await context.request!.get(`/place/${id}`))
        );

        const fulfilledResponses = responses
            .filter((r): r is PromiseFulfilledResult<SpringResponseType<PlaceType>> => r.status === "fulfilled")
            .map((r) => r.value)
            .filter((v) => v);

        setPlaces(fulfilledResponses.map(({ data }) => data))
    }

    const fetchCategories = async () => {
        const response = await context.request!.get("/categories")

        const responses = await Promise.allSettled(
            response.data.categories.map(async (id: number) => await context.request!.get(`/category/${id}`))
        );

        const fulfilledResponses = responses
            .filter((r): r is PromiseFulfilledResult<SpringResponseType<CategoryType>> => r.status === "fulfilled")
            .map((r) => r.value)
            .filter((v) => v);

        setCategories(fulfilledResponses.map(({ data }) => data))
    }


    const fetch = async () => {
        context.setLoading(LoadingType.FETCHING)
        try {
            await fetchPlaces();
            await fetchCategories();
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    const onSubmit = async () => {
        context.setLoading(LoadingType.LOADING)
        try {
            const response = await context.request!.post("/event", {
                "title": inputs.title,
                "description": inputs.title,
                "dateFrom": inputs.dateFrom,
                "dateTo": inputs.dateTo,
                "category": categories.find(({ id }) => id === Number(inputs.category)),
                "place": places.find(({ id }) => id === Number(inputs.place)),
                "status": "APPROVED",
                // "author": context.user.id
            })

            const eventId = response.data.eventId

            const responses = await Promise.allSettled(
                tickets.map(async ticket => await context.request!.post(`/event/${eventId}/ticket`, { ...ticket }))
            );
            const fulfilledResponses = responses
                .filter((r): r is PromiseFulfilledResult<AxiosResponse<SpringResponseType<ResponseMessageType>>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);
            
            navigate("/")
        } catch (error) {
            console.error(error)
        } finally {
            context.setLoading(LoadingType.NONE)
        }
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className={classes.container}>
            <h3 className={classes.sectionTitle}>General</h3>
            <Input required label='Title' name='title' value={inputs.title} onChange={onChange} />
            <InputLabel required value='Category'>
                <Dropdown name='category' value={inputs.category} items={categoriesToDropdown(categories)} onChange={onDropdownChange} />
            </InputLabel>
            <DateInput required label='Start date' name='dateFrom' value={inputs.dateFrom} onChange={onDateChange} />
            <DateInput label='End date' name='dateTo' value={inputs.dateTo} onChange={onDateChange} />
            <InputLabel required value='Place'>
                <Dropdown name='place' value={inputs.place} items={placesToDropdown(places)} onChange={onDropdownChange} />
            </InputLabel>
            <div className={classes.description}>

            <Textarea label='Description' name='description' value={inputs.description} onChange={onChange} />
            </div>
            <h3 className={classes.sectionTitle}>
                Tickets
                <StarRequire/>
            </h3>
            <div className={classes.tickets}>
                <TicketInputs tickets={tickets} setTickets={setTickets} />
            </div>
            <div className={classes.actions}>
                <Button onClick={() => navigate(-1)}>
                    Cancel
                </Button>
                <Button style='invert' disabled={isTicketsEmpty(tickets) || isEmpty(inputs)} onClick={onSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default CreateEventForm