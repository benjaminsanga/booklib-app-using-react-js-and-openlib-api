import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import "../../components/Footer/Footer.css"

const Other = () => {
  return (
    <main>
        <Navbar />
        <Outlet />
        <footer className="section bg-dark">
          <div className="container text-center">
            <p>&copy; <script>document.write(new Date().getFullYear())</script> NASFA. All rights reserved.</p>
            <div className="footer-links">
              <a href="/">Privacy Policy</a>
              <a href="/">Terms of Service</a>
              <a href="/">Contact</a>
            </div>
          </div>
        </footer>
    </main>
  )
}

export default Other
