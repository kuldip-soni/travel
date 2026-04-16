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
        <div style={{ textAlign: "center", marginBottom: "50px" }}>

          {/* Small Tagline */}
          <p style={{
            color: "#0284c7",
            fontWeight: "600",
            letterSpacing: "1px",
            fontSize: "14px",
            marginBottom: "8px"
          }}>
            ✈️ EXPLORE THE WORLD
          </p>

          {/* Main Title */}
          <h2 style={{
            fontWeight: "800",
            fontSize: "32px",
            color: "#111827",
            marginBottom: "12px"
          }}>
            Popular Travel Locations
          </h2>

          {/* Decorative Line */}
          <div style={{
            width: "60px",
            height: "4px",
            background: "linear-gradient(to right, #0284c7, #06b6d4)",
            margin: "0 auto 15px auto",
            borderRadius: "10px"
          }} />

          {/* Subtitle */}
          <p style={{
            color: "#6b7280",
            fontSize: "15px",
            maxWidth: "500px",
            margin: "0 auto",
            lineHeight: "1.6"
          }}>
            Discover amazing destinations—from beaches to mountains and historic cities.
          </p>

        </div>


        {/* Cards */}
        <div className="container-fluid px-4">
          <div className="row">

            {(locationdata?.location || []).map((v2) => (
              <div className="col-lg-4 col-md-6 mb-4" key={v2.id}>

                {/* 👇 Add padding inside column for spacing */}
                <div style={{ padding: "8px" }}>

                  <NavLink
                    to={`/locationdetails/${v2.id}`}
                    style={{ textDecoration: "none" }}
                  >

                    <div
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        background: "#fff",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                        transition: "all 0.35s ease",
                        cursor: "pointer",
                        height: "100%"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
                      }}
                    >

                      {/* IMAGE */}
                      <div style={{
                        position: "relative",
                        height: "230px",
                        overflow: "hidden"
                      }}>
                        <img
                          src={`http://localhost:4000/${v2.image}`}
                          alt={v2.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease"
                          }}
                        />

                        {/* Overlay */}
                        <div style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: "15px",
                          background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                          color: "#fff"
                        }}>
                          <h5 style={{ margin: 0, fontWeight: "700", fontSize: "18px" }}>
                            {v2.name}
                          </h5>
                        </div>

                        {/* Badge */}
                        <span style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          background: "#f59e0b",
                          color: "#fff",
                          padding: "5px 10px",
                          fontSize: "12px",
                          borderRadius: "8px"
                        }}>
                          Popular
                        </span>
                      </div>

                      {/* Content */}
                      <div style={{ padding: "15px" }}>
                        <p style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          marginBottom: "12px"
                        }}>
                          {v2.description?.slice(0, 85)}...
                        </p>

                        <button style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: "none",
                          background: "linear-gradient(to right, #0284c7, #06b6d4)",
                          color: "#fff",
                          fontSize: "13px"
                        }}>
                          create customized package →
                        </button>
                      </div>

                    </div>

                  </NavLink>

                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;