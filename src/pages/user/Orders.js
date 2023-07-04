import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from "moment"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [auth] = useAuth()

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/orders")
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    return (
        <Layout title={"Your Orders"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        {
                            orders.length > 0 ? (
                                <>
                                    <h5 className='fw-bold'>Your Orders</h5>
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>status</th>
                                                    <th>Buyer</th>
                                                    <th>Date</th>
                                                    <th>Payment</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            {
                                                orders?.map((o, i) => {
                                                    return (
                                                        <>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{i + 1}</td>
                                                                    <td>{o?.status}</td>
                                                                    <td>{o?.buyer?.name}</td>
                                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                                    <td>{o?.products?.length}</td>
                                                                </tr>
                                                            </tbody>
                                                            <div className="container">
                                                                {o?.products?.map((p, i) => (
                                                                    <div key={i} className="row my-2 card flex-row p-0">
                                                                        <div className="col-md-5 px-0">
                                                                            {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                                                                            <img src={p.imgLink} style={{ width: "150px", height: "190px", borderRadius: "5px" }} className="card-img-top" alt={p.name} />
                                                                        </div>
                                                                        <div className="col-md-6 d-flex" style={{ justifyContent: "center", flexDirection: "column" }}>
                                                                            <h6 className=' fw-bold mt-1'>{p.name}</h6>
                                                                            <h6>{p.description.substring(0, 36)}...</h6>
                                                                            <h5 className='fw-bold'>${p.price}</h5>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </table >
                                    </div>
                                </>
                            ) : (
                                <h4 className='fw-bold text-center '>You havent ordered anything yet</h4>
                            )
                        }

                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Orders