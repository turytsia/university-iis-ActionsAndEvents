import React, { useMemo } from 'react'
import classes from "./Table.module.css"

export type TableHeaderType = {
    [k: string]: string
}

type TableDataType = {
    [k: keyof TableHeaderType]: any
}[]

type PropsType = {
    dataKeys: TableHeaderType,
    data: TableDataType
}

/**
 * 
 * @param param0 
 * @returns 
 */
const Table = ({
    dataKeys,
    data
}: PropsType) => {

    const keys = useMemo(
        () => Object.keys(dataKeys),
        [dataKeys]
    )

    const titles = useMemo(
        () => Object.values(dataKeys),
        [dataKeys]
    )

    const header = titles.map(k => <div>{k}</div>)
    const body = data.map(item => keys.map(k => <div>{item[k]}</div>))
    return (
        <div className={classes.container} style={{ gridTemplateColumns: `repeat(${keys.length}, auto)`}}>
            {header}
            {body}
        </div>
    )
}

export default Table