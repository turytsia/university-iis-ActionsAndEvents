import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import { Link } from 'react-router-dom'

import classes from "./Register.module.css"
import { roles } from '../../utils/common'

type PropsType = {
    role: roles
}

const initialInputs = {
    "login": "",
    "password": "",
    "email": "",
    // "firstname": "Alex",
    // "lastname": "Turytsia",
    // "phone": "12345689987",
    // "email": "xturyt00@fit.vut.cz",
    // "roles": "ROLE_USER"
}

const Register = ({
    role
}: PropsType) => {
    const context = useContext(AppContext)

    const [inputs, setInputs] = useState(initialInputs)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = () => {
        context.register(inputs.login, inputs.email, inputs.password, role)
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h4>Register</h4>
            </div>
            <input value={inputs.login} name="login" onChange={onChange} placeholder='Login' type='text' />
            <input value={inputs.email} name="email" onChange={onChange} placeholder='Email' type='email' />
            <input value={inputs.password} name="password" onChange={onChange} placeholder='Password' type='password' />
            <div className={classes.actions}>
                <button onClick={onSubmit}>Register</button>
                <Link to="/login">Sign in</Link>
            </div>
        </div>
    )
}

export default Register