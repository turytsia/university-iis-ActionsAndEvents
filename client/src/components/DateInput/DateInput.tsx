import React, { SyntheticEvent, useRef } from 'react'
import ReactDatePicker from 'react-datepicker'

import classes from "./DateInput.module.css"
import InputLabel from '../InputLabel/InputLabel'

export type DateChangeType = (name: string, date: Date | null) => void

type PropsType = {
    value: string,
    onChange?: DateChangeType,
    label?: string,
    name: string
}

const DateInput = ({
    value,
    onChange: __onChange = () => { },
    label,
    name
}: PropsType) => {
    const ref = useRef<HTMLInputElement>(null)
    const onChange = (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => {
        __onChange(name, date)
    }
  return (
      <InputLabel htmlFor={classes.input} value={label}>
          <div style={{ position: 'relative' }}>
              <input ref={ref} style={{ display: "none" }} />
              <ReactDatePicker
                  id={classes.input}
                  name={name}
                  value={value}
                  onChange={onChange}
                  className={classes.input}
                  dateFormat="DD.MM.YYYY"
              />
          </div>
      </InputLabel>
  )
}

export default DateInput