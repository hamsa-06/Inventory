import React from "react"; 
import img from "./images/f1.jpeg";

const Features = () => {
  return (
    <div>
      <section id="features">
      <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Our Features</h3>
                <h1 className="display-6 text-center mb-4">
                Our <b>Awesome</b> Features
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>

        <div className="container my-5 py-5">
          {/* Header Section */}
          
          {/* Features Section */}
          <div className="row">
            <div className="col-12 text-center">
              {/* Feature 1 */}
              <div className="feature-item mb-5">
                <img
                  src={img}
                  alt="Feature 1"
                  className="img-fluid rounded mb-3"
                />
                <h5>Feature 1</h5>
                <p className="text-muted">
                  Description of Feature 1 goes here.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="feature-item mb-5">
                <img
                  src={img}
                  alt="Feature 2"
                  className="img-fluid rounded mb-3"
                />
                <h5>Feature 2</h5>
                <p className="text-muted">
                  Description of Feature 2 goes here.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="feature-item mb-5">
                <img
                  src={img}
                  alt="Feature 3"
                  className="img-fluid rounded mb-3"
                />
                <h5>Feature 3</h5>
                <p className="text-muted">
                  Description of Feature 3 goes here.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="feature-item mb-5">
                <img
                  src={img}
                  alt="Feature 4"
                  className="img-fluid rounded mb-3"
                />
                <h5>Feature 4</h5>
                <p className="text-muted">
                  Description of Feature 4 goes here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
