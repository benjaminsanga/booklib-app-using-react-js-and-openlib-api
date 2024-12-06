import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src = {aboutImg} alt = "" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About NASFA eLibrary</h2>
            <p className='fs-17'>Explore our vast collection and discover the book you’ve been searching for. Our system makes it easy to locate, reserve, and enjoy your next read. Dive into a world of knowledge, stories, and inspiration today!</p>
            {/* <p className='fs-17'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, dicta, possimus inventore eveniet atque voluptatibus repellendus aspernatur illo aliquam dignissimos illum. Commodi, porro omnis dolore amet neque modi quas eum!</p> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
