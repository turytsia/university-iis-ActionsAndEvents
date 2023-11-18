import React from 'react'
import classes from "./Textarea.module.css"
import InputLabel from '../InputLabel/InputLabel'

type PropsType = {
    value: string,
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>,
    label?: string,
    name?: string
}

const Textarea = ({
    value,
    onChange,
    label,
    name
}: PropsType) => {
  return (
      <InputLabel htmlFor={classes.input} value={label}>
          <textarea
              id={classes.input}
              name={name}
              value={value}
              onChange={onChange}
              className={classes.input}
          ></textarea>
      </InputLabel>
  )
}

export default Textarea