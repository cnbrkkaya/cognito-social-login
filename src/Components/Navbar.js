import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div>
      <Link to='order'>Order </Link>
      <Link to='menu'>Menu </Link>
      <Link to='auth'>LogIn </Link>
    </div>
  )
}

export default Navbar
