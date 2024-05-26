import React from 'react'
import { NavLink } from 'react-router-dom'

const banner = () => {
    return (
       <section className="sub-banner-link product-link">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xxl-6 col-xl-7 col-lg-8 col-md-9 col-12">
                            <ul className="product-banner-link banner-links d-flex align-items-center justify-content-md-start justify-content-center" data-aos="fade-right" data-aos-delay="2500" data-aos-duration="1000">
                                <li><NavLink to="" >Home Page</NavLink></li>
                                <li><img src={'/assets/Giftcard/arrow.svg'} alt="arrow" /></li>
                                <li><NavLink to="">Mobile & Data</NavLink></li>
                                <li><img src={'/assets/Giftcard/arrow.svg'} alt="arrow" /></li>
                                <li><NavLink to="" >Mobily - Saudi Arabia</NavLink></li>
                                <li><img src={'/assets/Giftcard/arrow.svg'} alt="arrow" /></li>
                                <li><NavLink to="" >STC quicknet</NavLink></li>
                            </ul>
                        </div>
                        <div className="col-xxl-6 col-xl-5 col-lg-4 col-md-3 col-12">
                            <form>
                                <div className="position-relative form-inner" data-aos="fade-left" data-aos-delay="2500" data-aos-duration="1000">
                                    <input type="text" className="form-control" placeholder="Search" />
                                    <img className="position-absolute input-search" src={'/assets/Giftcard/search-2.svg'} alt="search" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default banner