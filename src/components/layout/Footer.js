import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
   <div className="footer">
    <h5 className='text-center mt-1'>All Rights Reserved &copy; Shahama</h5>
    <p className="text-center mb-1" >
      <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> 
    </p>
   </div>
  )
}

export default Footer