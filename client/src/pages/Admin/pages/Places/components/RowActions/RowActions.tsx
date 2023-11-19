import React, { useContext, useState } from 'react'
import { AppContext } from '../../../../../../context/AppContextProvider'
import { PlaceType } from '../../Places'
import ButtonIconOnly from '../../../../../../components/ButtonIconOnly/ButtonIconOnly'
import icons from '../../../../../../utils/icons'
import DeleteModal from '../../../../../../modals/DeleteModal/DeleteModal'
import CreateCategoryModal from '../../../Categories/modals/CreateCategoryModal/CreateCategoryModal'
import CreatePlaceModal from '../../modals/CreatePlaceModal/CreatePlaceModal'

type PropsType = {
    place: PlaceType
    places: PlaceType[]
    setPlaces: React.Dispatch<React.SetStateAction<PlaceType[]>>
}

const RowActions = ({
    place,
    places,
    setPlaces
}: PropsType) => {

    const context = useContext(AppContext)

    const [isUpdateActive, setIsUpdateActive] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const updatePlace = async (inputs: PlaceType) => {
        try {
            const newCategory = {
                ...inputs
            }
            const response = await context.request!.patch(`/place/${place.id}`, newCategory)

            setPlaces(prev => prev.reduce((a, c, i) => [...a, c.id === place.id ? newCategory : c], [] as PlaceType[]))
            setIsUpdateActive(false)
        } catch (error) {
            console.error(error)
        }
    }

    const deletePlace = async () => {
        try {
            const response = await context.request!.delete(`/place/${place.id}`)

            setPlaces(prev => prev.filter(({ id }) => id !== place.id))
            setIsDeleteActive(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <ButtonIconOnly icon={icons.pen} onClick={() => setIsUpdateActive(true)}></ButtonIconOnly>
            <ButtonIconOnly icon={icons.trash} onClick={() => setIsDeleteActive(true)}></ButtonIconOnly>
            {isDeleteActive && (
                <DeleteModal
                    title='Delete place?'
                    onSubmit={deletePlace}
                    onClose={() => setIsDeleteActive(false)}
                />
            )}
            {isUpdateActive && (
                <CreatePlaceModal
                    title='Update place'
                    textProceed='Update'
                    inputs={place}
                    places={places}
                    onSubmit={updatePlace}
                    onClose={() => setIsUpdateActive(false)}
                />
            )}
        </>
    )
}

export default RowActions