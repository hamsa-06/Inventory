import React from 'react'; 

import { NavLink } from 'react-router-dom'; 

import './Register.css';  

const Register = () => { 

    return ( 

        <div className="register-container"> 

            <div className="register-box shadow-lg"> 

                <div className="register-left"> 

                    <img  

                        src="\public\images\f1.png"  

                        alt="Register Illustration"  

                        className="register-animation" 

                    /> 

                </div> 

                <div className="register-right"> 

                    <h2 className="text-center fw-bold mb-4">Create an Account</h2> 

                    <form> 

                        <div className="mb-3"> 

                            <label htmlFor="name" className="form-label">Full Name</label> 

                            <input 

                                type="text" 

                                className="form-control" 

                                id="name" 

                                placeholder="Enter your full name" 

                                required 

                            /> 

                        </div> 

                        <div className="mb-3"> 

                            <label htmlFor="email" className="form-label">Email Address</label> 

                            <input 

                                type="email" 

                                className="form-control" 

                                id="email" 

                                placeholder="Enter your email" 

                                required 

                            /> 

                        </div> 

                        <div className="mb-3"> 

                            <label htmlFor="password" className="form-label">Password</label> 

                            <input 

                                type="password" 

                                className="form-control" 

                                id="password" 

                                placeholder="Enter your password" 

                                required 

                            /> 

                        </div> 

                        <div className="mb-3"> 

                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label> 

                            <input 

                                type="password" 

                                className="form-control" 

                                id="confirmPassword" 

                                placeholder="Confirm your password" 

                                required 

                            /> 

                        </div> 

                        <div className="d-grid"> 

                            <button type="submit" className="btn btn-primary rounded-pill"> 

                                Register 

                            </button> 

                        </div> 

                        <p className="text-center mt-3"> 

                            Already have an account?{' '} 

                            <NavLink to="/login" className="text-decoration-none"> 

                                Login 

                            </NavLink> 

                        </p> 

                    </form> 

                </div> 

            </div> 

        </div> 

    ); 

}; 

 

export default Register; 