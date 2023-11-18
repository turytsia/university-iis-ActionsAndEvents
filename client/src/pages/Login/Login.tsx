import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContextProvider'
import { Link } from 'react-router-dom'

import classes from "./Login.module.css"

const initialInputs = {
    "login": "",
    "password": "",
}

const Login = () => {
    const context = useContext(AppContext)

    const [inputs, setInputs] = useState(initialInputs)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onSubmit = () => {
        context.login(inputs.login, inputs.password)
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h4>Login</h4>
            </div>
            <input value={inputs.login} name="login" onChange={onChange} placeholder='Login' type='text' />
            <input value={inputs.password} name="password" onChange={onChange} placeholder='Password' type='password' />
            <div className={classes.actions}>
                <button onClick={onSubmit}>Login</button>
                <Link to="/user/register">Sign up</Link>
            </div>
        </div>
    )
}

export default Login