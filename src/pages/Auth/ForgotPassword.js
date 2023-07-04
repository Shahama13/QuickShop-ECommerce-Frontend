import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import "../../styles/register.css"


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")


    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', {
                email, newPassword, answer
            })

            if (res && res.data.success) {
                toast.success(res.data.message)
               
              
                navigate('/login')
            }
            else { toast.error(res.data.message) }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <Layout title={"Forgot Password - QuickShop"}>
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>RESET PASSWORD</h4>

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
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Your favourite artist'
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='enter new password'
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >RESET</button>
                    
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword