import React from "react";
import img from './images/ims1.jpeg';
const About = () => {
  return (
    <div>
      <section id="about">
        <div className="container my-5 py-5">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <img
                src={img}
                alt="About"
                className="w-75 mt-5"
              />
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <h3 className="fs-5 mb-0">About Us</h3>
              <h1 className="display-6 mb-2">
                Why <b>Choose</b> Us?
              </h1>
              <hr className="w-50" />
              <p className="lead mb-4">
                <strong>Tailored for Perishables:</strong> Built specifically to tackle the challenges of perishable inventory management.
                <br />
                <strong>Scalable Solution:</strong> Perfect for small businesses to large-scale operations with multiple outlets.
                <br />
                <strong>User-Friendly Interface:</strong> Easy to navigate and highly intuitive design.
              </p>
              <button className="btn btn-primary rounded-pill px-4 py-2">
                Get started
              </button>
              <button className="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">
                Contact us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
