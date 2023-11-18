/**
 * @fileoverview Dropdown implementation
 *
 * This file contains implementation of a Dropdown. This component is
 * inherited from DismissWindow and widen its implementation into Dropdown.
 *
 * @module Dropdown
 * 
 * @author xturyt00
 */
import { useContext } from 'react'
import DismissWindow from "../DismissWindow/DismissWindow"
import { placements } from '../../utils/common'
import { Icon } from '@iconify/react'
import icons from '../../utils/icons'
import { AppContext } from '../../context/AppContextProvider'
import classes from "./Dropdown.module.css"
import classNames from 'classnames'
import Input from '../Input/Input'

export type DropdownItemType = {
    id: string,
    value: string
}

type PropsType = {
    value: string | null
    items: DropdownItemType[]
    name?: string
    label?: string
    onChange: (value: string, name: string) => void
}

/**
 * Dropdown component
 * 
 * @param props - Component props
 * @param props.label - Label text
 * @param props.value - Value
 * @param props.items - Dropdown items
 * @param props.name - Name
 * @param props.onChange - Callback to change the button
 * @returns Dropdown component
 */
const Dropdown = ({
    label = "",
    value,
    items,
    name = "",
    onChange
}: PropsType) => {

    // const { isDark } = useContext(AppContext)
    const currentValue = items.find(({ id }) => String(id) === String(value))?.value

    const dropdownStyles = classNames(classes.dropdown)

    const itemStyles = classNames(classes.item)

    return (
        <DismissWindow
            align
            offset={0}
            placement={placements.BOTTOM}
            element={(isActive) =>
                <div className={dropdownStyles}>
                    {label && (
                        <span className={classes.label}>
                            {label}
                        </span>
                    )}
                    <Input inactive value={currentValue as string} />
                    <Icon className={classes.icon} icon={isActive ? icons.arrowUp : icons.arrowDown} height={20} width={20} />
                </div>}>
            {setIsActive =>
                <div className={classes.container}>
                    {items.map(({ id, value }) => (
                        <button key={id} className={itemStyles} onClick={() => { setIsActive(false); onChange(id, name) }}>
                            {value}
                        </button>
                    ))}
                </div>}
        </DismissWindow>
    )
}

export default Dropdown