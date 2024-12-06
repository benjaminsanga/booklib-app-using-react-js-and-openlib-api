import React from 'react'
import './Footer.css'
import img from "./libarian.jpg"

const Footer = () => {
  return (
    <div style={{paddingTop: "5rem"}}>
      <section class="section bg-white">
        <div className='container' style={{paddingBottom: '7.5rem'}}>
          <p className='text-large'>
          The E-Library Project aims to establish a functional, cost-effective, and resource-rich digital library to enhance the academic experience of students. Leveraging open-source technologies and freely available educational materials, this project will provide a centralized platform for learning, research, and collaboration. It aligns with the institution's goal of fostering innovation, accessibility, and academic excellence while minimizing financial burdens.
          </p>
        </div>
        <div class="container flex flex-col flex-row align-center">
          <div style={{flex: 1}} class="text-left">
            <h2 class="text-large mb-20">THE LIBRARIAN (CIVILLIAN)</h2>
            <p class="text-medium mb-20">Mrs Helen Omolara Aribatise</p>
          </div>
          <div style={{flex: 2}} class="mb-20">
            <img src={img} alt="LIBRARIAN" class="rounded shadow" style={{width: '100%', maxWidth: '250px'}} />
          </div>
        </div>
      </section>

      <footer class="section bg-dark">
        <div class="container text-center">
          <p>&copy; <script>document.write(new Date().getFullYear())</script> NASFA. All rights reserved.</p>
          <div class="footer-links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Contact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer