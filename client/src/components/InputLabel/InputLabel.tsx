import React from 'react'
import classes from "./InputLabel.module.css"

type PropsType = {
    htmlFor?: string,
    children: React.ReactNode,
    value?: string // TODO add vertical alignment
}

const InputLabel = ({
    htmlFor,
    children,
    value
}: PropsType, ref: React.Ref<HTMLDivElement>) => {
    if (!value) {
        return (
            <div>
                {children}
            </div>
        )
    }

    return (
        <div ref={ref} className={classes.container}>
            <label htmlFor={htmlFor ?? classes.container}>{value}</label>
            {children}
        </div>
    )
}

export default React.forwardRef(InputLabel)