import React from 'react'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/layout/UserMenu'

const Dashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout title={"Dashboard- QuickShop"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h5>{auth?.user?.name}</h5>
              <h5>{auth?.user?.email}</h5>
              <h5>{auth?.user?.address}</h5>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard