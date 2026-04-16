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
    <div style={{ background: "#f5f7fa", padding: "70px 0", marginTop: "80px" }}>

  <div className="container">

   {/* Title */}
<div style={{ textAlign: "center", marginBottom: "55px" }}>

  {/* Small Tagline */}
  <p style={{
    color: "#0284c7",
    fontWeight: "600",
    letterSpacing: "1px",
    fontSize: "14px",
    marginBottom: "8px"
  }}>

    ✨ FIX PACKAGES

  </p>


  {/* Main Title */}
  <h2 style={{
    fontWeight: "800",
    fontSize: "34px",
    color: "#111827",
    marginBottom: "12px",
    letterSpacing: "-0.5px"
  }}>
    Popular Travel Packages
  </h2>

  {/* Decorative Line */}
  <div style={{
    width: "70px",
    height: "4px",
    background: "linear-gradient(to right, #0284c7, #06b6d4)",
    margin: "0 auto 18px auto",
    borderRadius: "10px"
  }} />

  {/* Subtitle */}
  <p style={{
    color: "#6b7280",
    fontSize: "15.5px",
    maxWidth: "520px",
    margin: "0 auto",
    lineHeight: "1.7"
  }}>
    Explore curated travel packages designed for every kind of traveler —
    from relaxing escapes to thrilling adventures, all in one place.
  </p>

</div>

    {/* Cards */}
    <div className="row">

      {packagedata.package?.map((v2) => (

        <div className="col-lg-4 col-md-6 mb-4" key={v2.id}>

          {/* spacing wrapper */}
          <div style={{ padding: "10px" }}>

            <NavLink
              to={`/packagedetails/${v2.id}`}
              style={{ textDecoration: "none" }}
            >

              <div
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "all 0.35s ease",
                  height: "100%"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
                }}
              >

                {/* IMAGE */}
                <div style={{ position: "relative", height: "230px" }}>
                  <img
                    src={`http://localhost:4000/${v2.image}`}
                    alt={v2.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "0.4s"
                    }}
                  />

                  {/* Gradient */}
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "15px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "#fff"
                  }}>
                    <h5 style={{ margin: 0, fontWeight: "600" }}>
                      {v2.name}
                    </h5>
                  </div>

                  {/* Price Badge */}
                  <div style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "linear-gradient(to right, #ff7e5f, #ff3d3d)",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                  }}>
                    ₹ {v2.price}
                  </div>

                </div>

                {/* CONTENT */}
                <div style={{ padding: "16px" }}>

                  <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "12px"
                  }}>
                    {v2.duration}
                  </p>

                  {/* Button */}
                  <button style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(to right, #0284c7, #06b6d4)",
                    color: "#fff",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "0.3s"
                  }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                  >
                    View Details →
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
  );
}

export default Package;