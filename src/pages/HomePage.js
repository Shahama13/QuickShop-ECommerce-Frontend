import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Radio } from "antd"
import { Prices } from '../components/Prices'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [cart, setCart] = useCart()

  const navigate = useNavigate();


  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category")
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategories();
    getTotal()
  }, [])

  const getAllPproducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data?.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  // get totalcount
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      const { data } = response;
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  // filter by category
  const handleFilter = async (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    }
    else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllPproducts()
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio, cart])

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('/api/v1/product/product-filters', {
        checked, radio
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={"All Products- Best Offers"}>
      <div className="row mt-4 ">
        <div className="col-md-3">
          <h4 className="mx-5 mt-5">Category</h4>
          <div className="d-flex flex-column mx-2">
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className='mx-5'>
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* Price filter */}
          <h4 className="mx-5 mt-3">Price</h4>
          <div className="d-flex flex-column mx-2 ">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array} className='mx-5'>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mx-2 ">
            <button className='btn btn-outline-primary mt-4' onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className="col-md-9">

          <h4 className="text-center">All Products</h4>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p,i) => (
              <div key={i} className="card m-3" style={{ width: "14rem" , height:"fit-content"}} >
                {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                <img src={p.imgLink} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{p.name}</h5>
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
          <div className='mx-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-primary'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1)
                }}>
                {loading ? "Loading.." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage