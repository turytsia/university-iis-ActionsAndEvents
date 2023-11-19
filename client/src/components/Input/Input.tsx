import React from 'react'
import classes from "./Input.module.css"
import InputLabel from '../InputLabel/InputLabel'
import classNames from 'classnames'

type PropsType = {
    value: string,
    type?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    label?: string,
    name?: string,
    inactive?: boolean
    className?: string
    placeholder?: string
}

const Input = ({
    value,
    type,
    onChange,
    label,
    name,
    inactive,
    className = "",
    placeholder = ""
}: PropsType) => {
    return (
        <InputLabel htmlFor={classes.input} value={label}>
            <input
                id={classes.input}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={classNames(classes.input, className)}
                readOnly={inactive}
            />
        </InputLabel>
    )
}

export default Input