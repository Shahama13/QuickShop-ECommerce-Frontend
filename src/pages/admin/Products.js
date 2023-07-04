import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import toast from "react-hot-toast"
import { Link } from 'react-router-dom'

const Products = () => {

    const [products, setProducts] = useState([])

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error("error in getting products")
        }
    }

    useEffect(() => {
        getAllProducts();
    })

    return (
        <Layout>
            <div className="container-fluid m-3 p-3">

                <div className="row">

                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h4 className="text-center m-1 fw-bold">All Products</h4>
                        <div className="d-flex" style={{ flexWrap: "wrap" }}>
                            {products?.map(p => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                    <div className="card m-3" style={{ width: "14rem" }} >
                                        {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                                        <img src={p.imgLink} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="fw-bold card-title">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 40)}...</p>
                                            <h5 className="fw-bold card-text">${p.price}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products