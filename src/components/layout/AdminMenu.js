import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Manage Categories</NavLink>
                    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Products</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Edit Products</NavLink>
                    <NavLink to="/dashboard/admin/users/orders" className="list-group-item list-group-item-action">User Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default AdminMenu