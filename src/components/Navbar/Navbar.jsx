import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import logo from "../../images/logo.png"
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);
  const {user, logout} = useAuth()

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("User logged out successfully");
      window.location.href = '/'
    } catch (error) {
      toast.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className='navbar' id = "navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler'>
          <Link to = "/" className='navbar-brand'>
            <img src={logo} style={{width: '150px', height: 'auto'}} alt="Logo" />
          </Link>
          <button type = "button" className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size = {35} style = {{
              color: `${toggleMenu ? "#fff" : "#010101"}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className = "navbar-nav">
            <li className='nav-item'>
              <Link to = "/" className='nav-link text-white fs-22 fw-6 ls-1'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to = "/upload" className='nav-link text-white fs-22 fw-6 ls-1'>Upload Paper</Link>
            </li>
            <li className='nav-item'>
              {
                !user?.id ? <Link to = "auth" className='nav-link text-white fs-22 fw-6 ls-1'>Login</Link> : 
                <Link to="auth" className='nav-link text-white fs-22 fw-6 ls-1' onClick={(e) => {
                  e.preventDefault()
                  handleLogout()
                }}>Logout</Link> 
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar