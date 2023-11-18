import React from 'react'
import classes from "./Input.module.css"
import InputLabel from '../InputLabel/InputLabel'

type PropsType = {
    value: string,
    type?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    label?: string,
    name?: string,
    inactive?: boolean
}

const Input = ({
    value,
    type,
    onChange,
    label,
    name,
    inactive
}: PropsType) => {
    return (
        <InputLabel htmlFor={classes.input} value={label}>
            <input
                id={classes.input}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={classes.input}
                readOnly={inactive}
            />
        </InputLabel>
    )
}

export default Input