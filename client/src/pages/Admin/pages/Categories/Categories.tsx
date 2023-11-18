import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContextProvider'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import { SpringResponseType } from '../../../../utils/common'

import classes from "./Categories.module.css"
import Input from '../../../../components/Input/Input'
import InputLabel from '../../../../components/InputLabel/InputLabel'
import Table, { TableHeaderType } from '../../../../components/Table/Table'
import TableFormView from '../../../../components/TableFormView/TableFormView'

export type CategoryType = {
    id: number,
    name: string,
    status: string,
    parentCategory: number
}

type CategoryInput = {
    name: string,
    status: string,
    parentCategory: number
}

const initialInputs: CategoryInput = {
    name: "",
    status: "",
    parentCategory: -1
}

const dataKeys: TableHeaderType = {
    id: "Id",
    name: "Name",
    status: "Status",
    parentCategory: "Parent Id"
}

export const categoriesToDropdown = (categories: CategoryType[]) => {
    return categories.map(({ id, name }) => ({ id: id?.toString(), value: name }))
}

const Categories = () => {

    const context = useContext(AppContext)

    const [inputs, setInputs] = useState<CategoryInput>(initialInputs)
    const [categories, setCategories] = useState<CategoryType[]>([])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onDropdownChange = (value: string | number, name: string) => {
        setInputs(prev => ({ ...prev, parentCategory: +value }))
    }

    const onSubmit = async () => {
        try {
            const response = await context.request!.post("/category", {
                name: inputs.name,
                parentCategory: null,
                status: "APPROVED"
            })
            setCategories(prev => [...prev, { id: response.data.categoryId, ...inputs } as CategoryType])
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await context.request!.get("/categories")

            const responses = await Promise.allSettled(
                response.data.categories.map(async (id: number) => await context.request!.get(`/category/${id}`))
            );

            const fulfilledResponses = responses
                .filter((r): r is PromiseFulfilledResult<SpringResponseType<CategoryType>> => r.status === "fulfilled")
                .map((r) => r.value)
                .filter((v) => v);
            
            setCategories(fulfilledResponses.map(({data}) => data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    return (
        <TableFormView>
            <div className={classes.form}>
                <Input label='Name' name='name' value={inputs.name} onChange={onChange} />
                <InputLabel value='Parent category'>
                    <Dropdown value={inputs.parentCategory.toString()} items={categoriesToDropdown(categories)} onChange={onDropdownChange} />
                </InputLabel>
                <div>
                    <button onClick={onSubmit}>
                        Create
                    </button>
                </div>
            </div>
            <Table dataKeys={dataKeys} data={categories} />
        </TableFormView>
    )
}

export default Categories