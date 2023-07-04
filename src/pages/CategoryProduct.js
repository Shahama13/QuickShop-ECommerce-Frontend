import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/cart'

const CategoryProduct = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [cart, setCart] = useCart()

  useEffect(() => {
    if (params?.slug) getProductsByCat()
  }, [params?.slug])

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className='text-center' >Category - {category?.name}</h4>
        <h6 className='text-center' >{products?.length} {products?.length === 1 || 0 ? "result" : "results"}  found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products?.map((p, i) => (
              <div key={i} className="card m-3" style={{ width: "12rem" }} >
                {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                <img src={p.imgLink} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title fw-bolf">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 20)}...</p>
                  <p className="card-text fw-bold">${p.price}</p>
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct