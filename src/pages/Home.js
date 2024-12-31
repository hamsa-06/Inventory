import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import fore from './images/i.png';
import waste from './images/waste.jpeg';
import stock from './images/stock.jpeg';
import multi from './images/multi.jpeg';
import auto from './images/auto.jpeg';
import expiration from './images/expiration.jpeg';

const HomePage = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    const handleRegister = (e) => {
        e.preventDefault();
        alert("Registration successful! Please log in.");
        setIsRegistering(false); // Switch back to login after registration
    };

    const renderContent = () => {
        if (activeSection === "home") {
            return (
                <>
                    {/* Hero Section */}
                    <section id="home" className="hero-section text-center bg-light py-5">
                        <h1 className="display-4">Smart Inventory Management for Perishable Goods</h1>
                        <div className="container">
                            <p className="lead mt-3">
                                Optimizing inventory levels, minimizing waste, and ensuring fresh
                                supply for grocery stores, restaurants, and businesses dealing with
                                perishables.
                            </p>
                        </div>
                        <button
                            onClick={() => setActiveSection("login")}
                            className="btn btn-primary btn-lg mt-3"
                        >
                            Get Started
                        </button>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="py-5">
                        <h2 className="mb-4 text-center">Our Features</h2>
                        <div className="container-fluid">
                            <div className="row">
                                {/* Feature Cards */}
                                <div className="col-sm-6 col-lg-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={waste}
                                            className="card-img-top"
                                            alt="Waste Analytics"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Waste Analytics</h5>
                                            <p className="card-text">
                                                Tracks and reports on expired or wasted items, providing insights into purchasing inefficiencies.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={auto}
                                            className="card-img-top"
                                            alt="Automated Ordering"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Automated Ordering</h5>
                                            <p className="card-text">
                                                Integrates with suppliers to automatically reorder items.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={expiration}
                                            className="card-img-top"
                                            alt="Expiration Tracking"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Expiration Tracking</h5>
                                            <p className="card-text">
                                                Allows entry of product expiration dates upon stock arrival, with automated reminders.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-sm-6 col-lg-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={multi}
                                            className="card-img-top"
                                            alt="Expiration Tracking"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title"> Multi-Outlet Management</h5>
                                            <p className="card-text">
                                            Supports centralized inventory management for
                                            businesses with multiple outlets.                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={fore}
                                            className="card-img-top"
                                            alt="Inventory Forecasting"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title"> Inventory Forecasting</h5>
                                            <p className="card-text">
                                            Predicts future stock requirements based on sales
                                            patterns, seasonal trends, and product shelf-life.                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-lg-4 mb-4">
                                    <div className="card">
                                        <img
                                            src={stock}
                                            className="card-img-top"
                                            alt="Inventory Forecasting"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Stock Rotation Suggestions</h5>
                                            <p className="card-text">
                                            Suggests which items should be used or sold
                                            first to minimize spoilage.                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                        </div>
                        
                    </section>

                    {/* About Us Section */}
                     <section id="aboutus" className="py-5 bg-light">
    <div className="container-fluid text-center">
        <h2>About Us</h2>
        <p className="mt-3">
            Smart Inventory Management is a cutting-edge solution tailored for businesses managing perishable goods. 
            Our mission is to revolutionize inventory systems by combining technology, data-driven insights, and 
            user-friendly features to address challenges unique to perishable inventory.
        </p>
        <p className="mt-3">
            We understand the critical role of maintaining freshness, reducing waste, and ensuring optimal stock levels. 
            With our platform, businesses can streamline inventory operations, save costs, and enhance customer satisfaction.
        </p>
        <div className="row justify-content-center mt-4">
            <div className="card col-md-5 mx-2 p-3 shadow-sm">
                <h5 className="mb-3">Our Vision</h5>
                <p>
                    To be the leading inventory management platform for perishables, empowering businesses worldwide to 
                    operate sustainably and efficiently.
                </p>
            </div>
            <div className="card col-md-5 mx-2 p-3 shadow-sm">
                <h5 className="mb-3">Our Mission</h5>
                <p>
                    To minimize food waste and maximize operational efficiency by providing innovative tools 
                    for real-time tracking, forecasting, and analytics.
                </p>
            </div>
        </div>
        <p className="mt-4">
            Whether you are managing a grocery store, restaurant, or distribution business, Smart Inventory Management is your trusted partner for achieving operational excellence. 
            Join us in our journey to create a more sustainable and efficient future for perishables.
        </p>
    </div>
</section>


                </>
            );
        } else if (activeSection === "login") {
            return (
                <section id="login-register" className="py-5">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 col-sm-10">
                            <div className="card shadow-lg border-0">
                                <div className="card-body p-4">
                                    <h2 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h2>
                                    <form
                                        onSubmit={isRegistering ? handleRegister : handleLogin}
                                        className="mt-3"
                                    >
                                        {isRegistering && (
                                            <div className="mb-3">
                                                <label className="form-label">Full Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>
                                        )}
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-2"
                                        >
                                            {isRegistering ? "Register" : "Login"}
                                        </button>
                                    </form>
                                    <div className="text-center mt-3">
                                        {isRegistering ? (
                                            <p>
                                                Already have an account?{" "}
                                                <button
                                                    className="btn btn-link p-0"
                                                    onClick={() => setIsRegistering(false)}
                                                >
                                                    Login
                                                </button>
                                            </p>
                                        ) : (
                                            <p>
                                                Don't have an account?{" "}
                                                <button
                                                    className="btn btn-link p-0"
                                                    onClick={() => setIsRegistering(true)}
                                                >
                                                    Register
                                                </button>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            );
        }
        return null;
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#home" onClick={() => setActiveSection("home")}>
                        Smart Inventory
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#features" onClick={() => setActiveSection("home")}>
                                    Features
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#aboutus" onClick={() => setActiveSection("home")}>
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#login-register"
                                    onClick={() => setActiveSection("login")}
                                >
                                    Login/Register
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Dynamic Content */}
            {renderContent()}

            {/* Footer */}
            <footer className="footer bg-dark text-white text-center py-3">
                <p>&copy; 2024 Smart Inventory Management. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
