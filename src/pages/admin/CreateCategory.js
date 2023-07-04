import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from "antd"

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")

    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")


    // handleForm 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/v1/category/create-category", { name })
            if (data?.category?.name) {
                toast.success(`${data?.category?.name} category is created`)
                setName("")
                getAllCategories()
            }
            else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.message)
        }
    }


    // get all categories
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

    useEffect(() => {
        getAllCategories()
    }, [])

    // update category
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, {
                name: updatedName
            })
            if (data?.success) {
                toast.success(data?.message)
                setSelected(null)
                setUpdatedName("")
                setVisible(false)
                getAllCategories()
            }
            else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("SOMETHING WENT WRONG IN UPDATING CATEGORY")
        }
    }

    // delete category
    const handleDelete = async (id) => {

        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${id}`)
            if (data?.success) {
                toast.success(data?.message)
                getAllCategories()
            }
        } catch (error) {
            console.log(error.message)
            toast.error("SOMETHING WENT WRONG IN DELETING CATEGORY")
        }
    }

    return (
        <Layout title={"Dashboard - Create category"}>
            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3" >
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <h1>Manage Categories</h1>
                        <div className="p-3 w-50">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                                action={"create a new category"}
                                butn={"Create"}
                            />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map(c => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2'
                                                        onClick={() => {
                                                            setVisible(true);
                                                            setUpdatedName(c.name)
                                                            setSelected(c)
                                                        }}
                                                    >Edit</button>
                                                    <button className='btn btn-danger ms-2'
                                                        onClick={() => {
                                                            handleDelete(c._id)
                                                        }}
                                                    >Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm
                                value={updatedName}
                                setValue={setUpdatedName}
                                handleSubmit={handleUpdate}
                                action={"update category"}
                                butn={"Update"}
                            />
                        </Modal>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory