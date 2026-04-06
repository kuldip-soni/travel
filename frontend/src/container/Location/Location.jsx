import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getlocation } from '../../redux/slice/location.slice';
import { NavLink } from 'react-router-dom';

function Location() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getlocation());
  }, [dispatch]);

  const locationdata = useSelector((state) => state.location);

  return (
<div style={{ 
  padding: "50px 0", 
  background: "#f5f7fa",
  marginTop: "80px"   // adjust based on your header height
}}>      
      <div className="container">
        
        {/* Title */}
        <h2 style={{
          textAlign: "center",
          fontWeight: "700",
          marginBottom: "10px"
        }}>
          Popular Travel Locations
        </h2>

        <p style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "40px"
        }}>
          Discover amazing destinations—from beaches to mountains and historic cities.
        </p>

        {/* Cards */}
        <div className="row">
          {locationdata.location?.map((v2) => (
            
            <div className="col-lg-4 col-md-6 mb-4" key={v2.id}>
              
              <NavLink 
                to={`/locationdetails/${v2.id}`} 
                style={{ textDecoration: "none" }}
              >
                
                <div style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  background: "#fff",
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
                  <div style={{
                    height: "220px",
                    overflow: "hidden"
                  }}>
                    <img
                      src={`http://localhost:4000/${v2.image}`}
                      alt={v2.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "0.4s"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
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
                      {v2.description?.slice(0, 90)}...
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

export default Location;