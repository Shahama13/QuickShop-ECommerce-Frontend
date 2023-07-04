import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'


const PageNotFound = () => {
  return (
    <Layout>
      <div className="pnf">
        <h3 className="pnf-title"> 404 </h3>
        <h4 className="pnf-heading">Oops ! Page Not Found</h4>
        <Link to="/" className='pnf-btn'>
          Go Back
        </Link>

      </div>
    </Layout>
  )
}

export default PageNotFound