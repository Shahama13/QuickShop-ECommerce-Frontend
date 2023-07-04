import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth';
import Spinner from "../Spinner"
import { Outlet } from 'react-router-dom';
import axios from 'axios';

export default function AdminRoute() {
    const [ok, setok] = useState(false)
    const [auth, setAuth] = useAuth()
    useEffect(() => {
        const authcheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth')
            if (res.data.ok) {
                setok(true)
            }
            else {
                setok(false)
            }
        }
        if (auth?.token) authcheck()
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner path="" />
}
