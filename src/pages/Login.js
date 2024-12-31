import React from 'react'; 

import { NavLink } from 'react-router-dom'; 

import './Login.css'; // Import custom CSS for styling and animation 

 

const Login = () => { 

    return ( 

        <div className="login-container"> 

            <div className="login-box shadow-lg"> 

                <div className="login-left"> 

                    <img  

                        src="\public\images\login-illustration.png"  

                        alt="Login Illustration"  

                        className="login-animation" 

                    /> 

                </div> 

                <div className="login-right"> 

                    <h2 className="text-center fw-bold mb-4">Welcome Back!</h2> 

                    <form> 

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

                        <div className="d-grid"> 

                            <button type="submit" className="btn btn-primary rounded-pill"> 

                                Login 

                            </button> 

                        </div> 

                        <p className="text-center mt-3"> 

                            Don't have an account?{' '} 

                            <NavLink to="/register" className="text-decoration-none"> 

                                Register 

                            </NavLink> 

                        </p> 

                    </form> 

                </div> 

            </div> 

        </div> 

    ); 

}; 

 

export default Login; 

 