import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import "../../styles/register.css"
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {
                email, password
            })

            if (res && res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                // navigate( '/')
                navigate(location.state || '/')
            }
            else { toast.error(res.data.message) }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <Layout title={"Login - QuickShop"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Log In</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='email'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='password'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >Log In</button>
                    <div className="mt-3">
                        <button onClick={() => { navigate('/forgot-password') }}
                            type="submit"
                            className="btn btn-primary"
                        >Forgot Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login