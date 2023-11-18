import React, { useContext, useState } from 'react'
import { CategoryType } from '../../Categories'
import ButtonIconOnly from '../../../../../../components/ButtonIconOnly/ButtonIconOnly'
import icons from '../../../../../../utils/icons'
import CreateCategoryModal, { CategoryInput } from '../../modals/CreateCategoryModal/CreateCategoryModal'
import { AppContext } from '../../../../../../context/AppContextProvider'
import DeleteModal from '../../../../../../modals/DeleteModal/DeleteModal'

type PropsType = {
    category: CategoryType
    categories: CategoryType[]
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>
}

const RowActions = ({
    category,
    categories,
    setCategories
}: PropsType) => {

    const context = useContext(AppContext)

    const [isUpdateActive, setIsUpdateActive] = useState(false)
    const [isDeleteActive, setIsDeleteActive] = useState(false)

    const updateCategory = async (inputs: CategoryInput) => {
        try {
            const newCategory = {
                ...category,
                ...inputs
            }
            const response = await context.request!.patch(`/category/${category.id}`, newCategory)

            setCategories(prev => prev.reduce((a, c, i) => [...a, c.id === category.id ? newCategory : c], [] as CategoryType[]) )
            setIsUpdateActive(false)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteCategory = async () => {
        try {
            const response = await context.request!.delete(`/category/${category.id}`)

            setCategories(prev => prev.filter(({ id }) => id !== category.id))
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
                  title='Delete category?'
                  onSubmit={deleteCategory}
                  onClose={() => setIsDeleteActive(false)}
              />
          )}
          {isUpdateActive && (
              <CreateCategoryModal
                  title='Update category'
                  textProceed='Update'
                  inputs={category}
                  categories={categories}
                  onSubmit={updateCategory}
                  onClose={() => setIsUpdateActive(false)}
              />
          )}
      </>
  )
}

export default RowActions