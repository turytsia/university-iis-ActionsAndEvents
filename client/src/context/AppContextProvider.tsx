import axios, { AxiosInstance } from 'axios'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { roles } from '../utils/common'

type PropsType = {
  children: React.ReactNode
}

export type UserType = {
  id: number | null,
  login: string | null,
  firstname: string | null,
  lastname: string | null,
  phone: string | null,
  email: string | null,
  role: "ROLE_USER" | "ROLE_ADMIN" | "ROLE_MANAGER" | null
}

type AppContextType = {
  request: AxiosInstance | null,
  isAuth: boolean,
  register: (login: string, email: string, password: string, role: roles) => void,
  login: (login: string, password: string) => void,
  logout: () => void,
  user: UserType
}

const initialUser: UserType = {
  "id": null,
  "login": null,
  "firstname": null,
  "lastname": null,
  "phone": null,
  "email": null,
  "role": null
}

const context: AppContextType = {
  request: null,
  isAuth: false,
  register: () => { },
  login: () => { },
  logout: () => { },
  user: initialUser
}

export const AppContext = createContext(context)

export const floatingRoot = document.getElementById("portal")

/**
 * 
 * @param param0 
 * @returns 
 */
const AppContextProvider = ({ children }: PropsType) => {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState<UserType>(initialUser)

  const request = useMemo(
    () => axios.create({
      baseURL: 'http://localhost:8080',
      headers: token ? {
        "Authorization": `Bearer ${token}`
      } : {}
    }),
    [token]
  )

  const getUser = async () => {
    try {
      const response = await request.get<typeof initialUser>("/user")
      setUser(response.data)
    } catch (error) {
      logout()
    }
  }

  const register = async (login: string, email: string, password: string, role: roles) => {
    try {
      const response = await request.post<typeof initialUser>("/auth/register", {
        ...initialUser,
        login,
        password,
        email,
        roles: role
      })
      setUser(response.data)
    } catch (error) {
      setUser(initialUser)
    }
  }

  const login = async (login: string, password: string) => {
    try {
      const response = await request.post<string>("/auth/login", {
        login,
        password
      })
      setToken(response.data)
      localStorage.setItem("token", response.data)
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    setToken(null)
    setUser(initialUser)
    localStorage.removeItem("token")
  }

  const value: AppContextType = {
    request,
    isAuth: !!token,
    register,
    login,
    logout,
    user,
  }

  useEffect(() => {
    getUser()
  }, [token])


  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider