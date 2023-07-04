import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useCart } from '../../context/cart'

const ProductDetails = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    // get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }

    // get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.products)
        } catch (error) {

        }
    }

    return (
        <Layout>
            <div className="row container m-5">
                <div className="col-md-4">
                    {/* <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={p.name} /> */}
                    <img src={product.imgLink} className="card-img-top img-fluid " alt={product.name} style={{ height: "445px", width: "326px" }} />
                </div>
                <div className="col-md-6 ml-2">
                    <h2 className='mt-3' style={{ color: "darkblue" }}>{product.name} </h2>
                    <h2>${product?.price} </h2>
                    <p className='fw-bold'>{product?.description} </p>
                    {/* <h3>{product?.category?.name} </h3> */}
                    <button onClick={
                        () => {
                            setCart([...cart, product])
                            localStorage.setItem('cart', JSON.stringify([...cart, product]))
                            toast.success("Item added to cart")
                        }
                    } className="btn btn-outline-primary">Add to Cart</button>
                </div>
            </div>
            < hr />
            <div className="row">
                {relatedProduct.length > 1 && <h3 className='m-4 text-center'>Similar Products</h3>}
                {relatedProduct.length < 1 && <h5 className='m-4 text-center'>No Similar Products Found</h5>}

                <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {relatedProduct?.map((p, i) => (
                        <>
                            <div key={i} className="card m-4" style={{ width: "14rem" }} >
                                {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                                <img src={p.imgLink} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 20)}...</p>
                                    <p className="card-text">${p.price}</p>
                                    <button onClick={
                                        () => {
                                            setCart([...cart, p])
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                            toast.success("Item added to cart")
                                        }
                                    } className="btn btn-outline-primary">Add to Cart</button>
                                    <button className="btn btn-secondary mt-2" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails