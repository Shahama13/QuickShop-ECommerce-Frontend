import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Option } = Select

const UpdateProduct = () => {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getAllCategories()
        getSingleProduct()
        // eslint-disable-next-line
    }, [])

    const [categories, setCategories] = useState([])
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        shipping: "",
        category: null,
        photo: "",
        imgLink: ""
    })
    const [id, setId] = useState("")

    // get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setProduct({
                ...product,
                name: data?.product.name,
                description: data?.product.description,
                price: data?.product.price,
                shipping: data?.product.shipping,
                category: data?.product.category._id,
                quantity: data?.product.quantity,
                imgLink: data?.product.imgLink,
            })
            setId(data.product._id)
        } catch (error) {
            console.log(error)
        }
    }

    // GET ALL CATEGORIES
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category")
            if (data?.success) {
                setCategories(data?.category)
            }
        } catch (error) {
            console.log(error)
            toast.error("SOMETHING WENT WRONG IN GETTING CATEGORY")
        }
    }


    // create product
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append("name", product.name)
            productData.append("description", product.description)
            productData.append("price", product.price)
            productData.append("quantity", product.quantity)
            product.photo && productData.append("photo", product.photo)
            productData.append("category", product.category)
            productData.append("imgLink", product.imgLink)
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData)
            if (data?.success) {
                toast.success(data?.message)
                setProduct({
                    ...product,
                    name: "",
                    description: "",
                    price: "",
                    quantity: "",
                    shipping: "",
                    category: "",
                    photo: "",
                    imgLink: ""
                })
                navigate('/dashboard/admin/products')
            }
            else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    // delete a product
    const handleDelete = async () => {
        try {
            let answer = window.confirm("Are you sure you want to delete this product")
            if(!answer) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`)
            toast.success(data?.message)
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log("Something went wrong in deleting product")
        }
    }

    return (
        <Layout title={"Dashboard - Create Product"}>
            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => {
                                    setProduct(
                                        { ...product, category: value }
                                    )
                                }}
                                value={product?.category}

                            >
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}

                            </Select>

                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {product?.photo ? product.photo.name : "Change Photo"}
                                    <input type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setProduct({ ...product, photo: e.target.files[0] })}
                                        hidden />
                                </label>
                            </div>

                            <div className="mb-3">
                                {product.photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(product.photo)} alt="product_img" height={"200px"} className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={`/api/v1/product/product-photo/${id}`} alt="product_img" height={"200px"} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={product.imgLink}
                                    placeholder='set image thumbnail'
                                    className='form-control'
                                    onChange={(e) => setProduct({ ...product, imgLink: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={product.name}
                                    placeholder='write a name'
                                    className='form-control'
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea type="text"
                                    value={product.description}
                                    placeholder='write a description'
                                    className='form-control'
                                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={product.price}
                                    placeholder='price'
                                    className='form-control'
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text"
                                    value={product.quantity}
                                    placeholder='number of items in stock'
                                    className='form-control'
                                    onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="select shipping"
                                    size="large"
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => { setProduct({ ...product, shipping: value }) }}
                                    value={product?.shipping ? "Yes" : "No"}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary'
                                    onClick={handleUpdate}
                                >Update Product</button>
                                <button className='btn btn-danger'
                                    onClick={handleDelete}
                                >Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct