import React, { useContext, useEffect, useState } from 'react'
import classes from "./Places.module.css"
import Input from '../../../../components/Input/Input'
import { AppContext } from '../../../../context/AppContextProvider'
import { SpringResponseType } from '../../../../utils/common'
import TableFormView from '../../../../components/TableFormView/TableFormView'
import Table, { TableHeaderType } from '../../../../components/Table/Table'

export type PlaceType = {
    id: number,
    name: string,
    description: string,
    address: string
    status: string
}


export const placesToDropdown = (places: PlaceType[]) => {
    return places.map(({ id, name }) => ({ id: id?.toString(), value: name }))
}

const dataKeys: TableHeaderType = {
    id: "Id",
    name: "Name",
    address: "Address",
    status: "Status"
}

const initialInputs = {
    "name": "",
    "description": "",
    "address": "",
    "status": "APPROVED"
}

const Places = () => {

    const context = useContext(AppContext)
    
    const [places, setPlaces] = useState<PlaceType[]>([])
    const [inputs, setInputs] = useState(initialInputs)

    const fetchPlaces = async () => {
        try {
            const response = await context.request!.get("/places")

            const responses = await Promise.allSettled(
                response.data.places.map(async (id: number) => await context.request!.get(`/place/${id}`))
            );

            const fulfilledResponses = responses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<PlaceType>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);
            
            setPlaces(fulfilledResponses.map(({ data }) => data))
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = async () => {
        try {
            const response = await context.request!.post("/place", {
                ...inputs
            })

            setPlaces(prev => [...prev, { id: response.data.placeId, ...inputs }])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(
        () => {
            fetchPlaces()
        },
        []
    )

    return (
        <TableFormView>
            <div className={classes.form}>
                <Input label='Name' name='name' value={inputs.name} onChange={onChange} />
                <Input label='Description' name='description' value={inputs.description} onChange={onChange} />
                <Input label='Address' name='address' value={inputs.address} onChange={onChange} />

                <div>
                    <button onClick={onSubmit}>
                        Create
                    </button>
                </div>
            </div>
            <Table data={places} dataKeys={dataKeys} />
        </TableFormView>
    )
}

export default Places