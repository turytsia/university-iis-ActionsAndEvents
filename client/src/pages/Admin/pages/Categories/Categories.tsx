import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../../context/AppContextProvider'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import { SpringResponseType } from '../../../../utils/common'

import classes from "./Categories.module.css"
import Input from '../../../../components/Input/Input'
import InputLabel from '../../../../components/InputLabel/InputLabel'
import Table, { TableHeaderType } from '../../../../components/Table/Table'
import TableFormView from '../../../../components/TableFormView/TableFormView'
import Button from '../../../../components/Button/Button'
import CreateCategoryModal, { CategoryInput } from './modals/CreateCategoryModal/CreateCategoryModal'
import ButtonIconOnly from '../../../../components/ButtonIconOnly/ButtonIconOnly'
import icons from '../../../../utils/icons'
import RowActions from './components/RowActions/RowActions'

export type CategoryType = {
    id: number,
    name: string,
    status: string,
    parentCategory: number | null
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

    const [isCreateActive, setIsCreateActive] = useState(false)
    const [categories, setCategories] = useState<CategoryType[]>([])

    const onSubmit = async (inputs: CategoryInput) => {
        try {
            const response = await context.request!.post("/category", {
                name: inputs.name,
                parentCategory: inputs.parentCategory,
                status: "APPROVED"
            })
            setCategories(prev => [...prev, { id: response.data.categoryId, ...inputs } as CategoryType])
            setIsCreateActive(false)
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
            <Table
                dataKeys={dataKeys}
                data={categories}
                rowActions={(category) => (
                    <RowActions
                        categories={categories}
                        setCategories={setCategories}
                        category={category}
                    />
                )}
                actions={
                    <>
                        <Button style='invert' onClick={() => setIsCreateActive(true)}>Create category</Button>
                        {isCreateActive && (
                            <CreateCategoryModal
                                textProceed='Create'
                                title='Create category'
                                categories={categories}
                                onClose={() => setIsCreateActive(false)}
                                onSubmit={onSubmit}
                            />
                        )}
                    </>
                } />
        </TableFormView>
    )
}

export default Categories