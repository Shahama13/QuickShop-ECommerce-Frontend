import Layout from '../components/layout/Layout'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-hot-toast'

const CartPage = () => {

    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState("")
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    const totalprice = () => {
        try {
            let total = 0
            cart?.map((item) => { total = total + item.price })
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            });
        } catch (error) {
            console.log(error)
        }
        // tayswiftie1344@gmail.com
        // cid : vchjvsdhjfvjvffbvhj
        // secret:vbjfdfkjbvhjbgvjh
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token])


    // handle payments
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod()
            const { data } = await axios.post("/api/v1/product/braintree/payment", {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem("cart")
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success("Payment completed successfully")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-md-12">
                        <h5 className="text-center bg-light mt-3" >
                            {auth?.token &&
                                `Hello ${auth?.token && auth?.user?.name},`}
                        </h5>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `You have ${cart.length} item(s) in your cart ${auth?.token ? "" : "please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            {cart?.map((p,i) => (
                                <div className="row my-2 card flex-row p-0" key={i}>
                                    <div className="col-md-5 px-0">
                                        {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                                        <img src={p.imgLink} style={{ width: "150px", height: "190px", borderRadius: "5px" }} className="card-img-top" alt={p.name} />
                                    </div>
                                    <div className="col-md-6 d-flex" style={{ justifyContent: "center", flexDirection: "column" }}>
                                        <h6 className=' fw-bold mt-1'>{p.name}</h6>
                                        <h6>{p.description.substring(0, 36)}...</h6>
                                        <h5 className='fw-bold'>${p.price}</h5>
                                        <button className='btn btn-outline-danger p-1' onClick={() => removeCartItem(p._id)}> Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        {cart?.length !== 0 &&
                            (<>
                                <h5 className='mt-3'>Cart Summary</h5>
                                {/* <h5>Total | Checkout | Payment</h5> */}
                                <hr />
                                <h4>Total: {totalprice()}</h4>
                                {auth?.user?.address ? (
                                    <>
                                        <div className="mb-">
                                            <h6 className='m-3'>Current address : {auth?.user?.address}</h6>
                                            {/* <h6>{auth?.user?.address}</h6> */}
                                            <button className='btn btn-outline-warning'
                                                onClick={() => navigate('/dashboard/user/profile')}
                                            >Update Address</button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mb-3">
                                        {
                                            auth?.token ? (
                                                <button className='btn btn-outline-warning'
                                                    onClick={() => navigate('/dashboard/user/profile')}
                                                >Update Address</button>
                                            ) : (
                                                <button className='btn btn-outline-primary'
                                                    onClick={() => navigate('/login', {
                                                        state: "/cart"
                                                    })}
                                                >Login to checkout</button>
                                            )
                                        }
                                    </div>
                                )}
                                <div className="mt-2">
                                    {
                                        !clientToken || !cart?.length ? ("") : (
                                            <>
                                                <DropIn
                                                    options={{
                                                        authorization: clientToken,
                                                        paypal: {
                                                            flow: "vault"
                                                        }
                                                    }}
                                                    onInstance={instance => setInstance(instance)}
                                                />
                                                <button className='btn btn-primary' onClick={handlePayment}
                                                    disabled={ !instance || !auth?.user?.address}
                                                >
                                                    {loading ? "Processing..." : "Make Payment"}
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                            </>
                            )}

                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default CartPage