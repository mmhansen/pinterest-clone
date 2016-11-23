import React from 'react'
import { Link,IndexLink } from 'react-router'

const Navbar = function () {
  return (
    <div>
        <IndexLink to='/'>Home</IndexLink>
        <Link to='/login'>Login</Link>
    </div>
  )
}

export default Navbar
