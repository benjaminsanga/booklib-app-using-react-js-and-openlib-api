import React from 'react'
import './Footer.css'
import libarian from "./libarian.jpg"
import comdt from "../../images/osi.jpg"

const Footer = () => {
  return (
    <div style={{paddingTop: "5rem"}}>
      <section className="section bg-white">
        <div className='container' style={{paddingBottom: '7.5rem'}}>
          <p className='text-large'>
          The E-Library Project aims to establish a functional, cost-effective, and resource-rich digital library to enhance the academic experience of students. Leveraging open-source technologies, this project will provide a centralized platform for learning, research, and collaboration. It aligns with the institution's goal of fostering innovation, accessibility, and academic excellence while minimizing financial burdens.
          </p>
        </div>
        <div className="container flex flex-row" style={{alignItems: 'start'}}>
          <div style={{flex: 1, width: '30%'}} className="mb-20">
            <img src={comdt} alt="LIBRARIAN" className="rounded shadow" style={{width: '100%', maxWidth: '250px'}} />
            <div>
              <p className="text-medium">Major General Julius Ehioze Osifo</p>
              <h2 className="text-large mb-20">COMMANDANT</h2>
            </div>
          </div>
          <div style={{width: '70%'}}>
            <p>
              Major General Julius Ehioze Osifo, a distinguished and decorated veteran, assumed the role of the 51st Commandant of the Nigerian Army School of Finance & Administration (NASFA) in January 2023. A native of Edo State, General Osifo's military journey has been marked by remarkable achievements and leadership roles within various units and formations. He was currently promoted to a Major General on the 15th of December, 2023.
            </p>
            <p>
              General Osifo's journey began when he graduated with a Bachelor of Science (Honours) Degree in Economics from the Nigerian Defence Academy. His dedication and skills were recognized as he received his commission as a Second Lieutenant into the Nigerian Army, being part of the 41st Regular Combatant Course on the 12th of September. Over the years, he has accumulated extensive experience in diverse command and staff positions, serving across multiple divisions.
            </p>
            <p>
              Throughout his distinguished military career, General Osifo has demonstrated exceptional leadership. Notable appointments include his roles as Commander Division Finance and Accounts (CDFA) at Headquarters 3 Division Jos, Director of Finance at the Nigerian Armed Forces Resettlement Center Oshodi, Lagos, and Commander Division Finance and Accounts (CDFA) at 7 Division Finance HQ TC JTF (NE) OPHK. Presently, he serves as the Commandant at the Nigerian Army School of Finance and Administration in Apapa, a position he has held since 2023.
            </p>
            <p>
              General Osifo's educational journey showcases his commitment to continuous learning. In addition to his Bachelor's Degree, he holds a Master of Science Degree in Economics and a Doctor of Philosophy Degree in Finance.
            </p>
            <p>
              His professional affiliations include membership and fellowship in esteemed organizations such as the Nigerian Institute of Management, the Institute of Chartered Economists of Nigeria, and the Institute of Certified Public Accountants of Nigeria. General Osifo's pursuit of knowledge has led him to participate in numerous workshops and seminars at prestigious institutions, further enhancing his expertise.
            </p>
            <p>
              To enhance his military prowess, General Osifo has successfully completed a range of Military Courses. These include the Young Officers Course (Finance) at the Nigerian Army School of Finance and Administration Apapa Lagos, Young Officers Course (Infantry) at the Infantry Centre and School Jaji Nigeria, Cashiers Course at the Nigerian Army School of Finance and Administration Apapa Lagos, Computer Appreciation Course at the Nigerian Army School of Finance and Administration in Apapa, Lagos, Junior Staff Course at the Armed Forces Command and Staff College Jaji, Nigeria, Senior Staff Course at the Armed Forces Command and Staff College Jaji, and the Commander Division Finance and Accounts Course at the Nigerian Army School of Finance and Administration in Apapa, Lagos.
            </p>
            <p>
              General Osifo's dedication to duty and excellence has resulted in a collection of decorations and awards, including the Forces Service Star (FSS), the Meritorious Service Star (MSS), Passed Staff Course (psc), Passed Junior Staff Course (Pjsc), and the General Operations Medal (GOM).
            </p>
            <p>
              Furthermore, General Osifo has demonstrated his commitment to professional growth through extensive training, as well as his contributions to the field through various publications and research endeavors.
              Beyond his outstanding military career, General Osifo finds fulfillment in his personal life as well. He is happily married and a proud parent, rounding out his profile as a devoted family man.
            </p>
          </div>
        </div>
        <div className="container flex flex-row" style={{alignItems: 'start', marginTop: '12rem'}}>
          <div style={{flex: 1, width: '30%'}} className="mb-20">
            <img src={libarian} alt="LIBRARIAN" className="rounded shadow" style={{width: '100%', maxWidth: '250px'}} />
            <div>
              <p className="text-medium">Mrs Helen Omolara Aribatise</p>
              <h2 className="text-large mb-20">LIBRARIAN</h2>
            </div>
          </div>
          <div style={{width: '70%'}}></div>
        </div>
      </section>

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

    </div>
  )
}

export default Footer