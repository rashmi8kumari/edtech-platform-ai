import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () =>{
    return (
     <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Register</Link>
      <Link to="/login">Login</Link>
    </nav>
    );
};

export default Navbar;