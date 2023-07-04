import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'

const Search = () => {
    const [values, setValues] = useSearch()
    const [cart, setCart] = useCart()
    const navigate = useNavigate()
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text center">
                    <h5 className='text-center mt-3'>Search Results</h5>
                    <h6 className='text-center'>{values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p,i) => (
                            <div key={i} className="card m-3" style={{ width: "13rem", height:"fit-content" }} >
                                {/* <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} /> */}
                                <img src={p.imgLink} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h6 className="card-title fw-bold">{p.name}</h6>
                                    <p className="card-text">{p.description.substring(0, 20)}...</p>
                                    <p className="card-text fw-bold">${p.price}</p>
                                    <button onClick={
                                        () => {
                                            setCart([...cart, p])
                                            localStorage.setItem('cart', JSON.stringify([...cart, p]))
                                            toast.success("Item added to cart")
                                        }
                                    } className="btn btn-outline-primary">Add to Cart</button>
                                    <button className="btn btn-secondary mt-2 " onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search