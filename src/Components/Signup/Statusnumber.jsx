import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Design/index.css"

const Statusnumber = () => {
  return (
    <>
     <main>
            <div className="form-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="login-form-inner">
                                <form className="text-center">
                                    <div className="login-form-innerrr text-start">
                                        <label className="form-label">Status/residence number</label>
                                        <input type="email" className="form-control" />
                                    </div>
                                    <NavLink to="/signup" type="submit" className="btn  btn-primary-2">Go to <img src={'assets/Login/nafath.svg'} alt="nafath" /></NavLink>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Statusnumber