import React, { useState, useEffect } from 'react'
import useCategory from '../hooks/useCategory'
import Layout from '../components/layout/Layout'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"all Categories"}>
            <div className="container">
                <div className="row">
                    {categories.map((c) => (
                        <Link className="col-md-3"
                            key={c._id}
                            to={`/category/${c.slug}`}
                            style={{
                                border: '2px solid darkblue',
                                padding: '29px',
                                borderRadius: '15px',
                                textTransform: 'uppercase',
                                margin: '10px',
                                textDecoration: "none"
                            }}
                        >

                            {c.name}

                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories