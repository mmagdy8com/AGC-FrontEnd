import React from 'react'

const MainHeader = () => {
  return (
    <section className="sub-banner-link">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-5 col-12">
          <ul
            className="banner-links d-flex align-items-center justify-content-md-start justify-content-center"
            data-aos="fade-right"
            data-aos-delay="2500"
            data-aos-duration="1000"
          >
            <li>
              <a href="index.html">Home Page</a>
            </li>
            <li>
              <img src="/assets/Contact/arrow.svg" alt="arrow" />
            </li>
            <li>
              <a href="profile.html">My Account</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  )
}

export default MainHeader