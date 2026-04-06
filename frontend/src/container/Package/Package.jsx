import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getpackage } from '../../redux/slice/package.slice';

function Package(props) {
    const dispatch = useDispatch();
        useEffect(() => {
       
               dispatch(getpackage());
              
       
           }, []);
            const packagedata = useSelector(State => State.package);
               console.log(packagedata.package);
   return (
  <div style={{ background: "#f5f7fa", padding: "60px 0", marginTop: "80px" }}>
    
    <div className="container">

      {/* Top Section */}
      <div className="row align-items-center mb-5">
        
        <div className="col-lg-6">
          <h2 style={{ fontWeight: "700" }}>Popular Packages</h2>
          <p style={{ color: "#666" }}>
            Discover the most loved travel packages chosen by travelers. 
            Perfectly curated experiences for your next trip.
          </p>
        </div>

        <div className="col-lg-6 text-lg-end mt-3 mt-lg-0">
          <NavLink 
            to="/customizedpackage"
            style={{
              background: "#000",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            Customize Package
          </NavLink>
        </div>

      </div>

      {/* Cards */}
      <div className="row">
        {packagedata.package?.map((v2) => (

          <div className="col-lg-4 col-md-6 mb-4" key={v2.id}>
            
            <NavLink 
              to={`/packagedetails/${v2.id}`} 
              style={{ textDecoration: "none" }}
            >

              <div 
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }}
              >

                {/* Image */}
                <div style={{ position: "relative", height: "220px" }}>
                  <img
                    src={`http://localhost:4000/${v2.image}`}
                    alt={v2.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />

                  {/* Price Badge */}
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#ff6b6b",
                    color: "#fff",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600"
                  }}>
                    ₹ {v2.price}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "15px" }}>
                  
                  <h5 style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#333"
                  }}>
                    {v2.name}
                  </h5>

                  <p style={{
                    fontSize: "14px",
                    color: "#777"
                  }}>
                    {v2.duration}
                  </p>

                </div>

              </div>

            </NavLink>

          </div>

        ))}
      </div>

    </div>
  </div>
);
}

export default Package;