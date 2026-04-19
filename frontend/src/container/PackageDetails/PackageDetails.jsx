import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getpackage } from '../../redux/slice/package.slice';
import { getitineary } from '../../redux/slice/itineary.slice';
import { getlocation } from '../../redux/slice/location.slice';

function PackageDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getpackage());
    dispatch(getitineary());
    dispatch(getlocation());
  }, []);

  const { id } = useParams();
  const packagedata = useSelector(state => state.package);
  const itnorydata = useSelector(state => state.itineary);
  const locationdata = useSelector(state => state.location);

  const pD = packagedata.package?.find(v => v.id == id);
  const fit = itnorydata.itineary?.find(v => v.package_id === pD?.id);

  return (
    <div style={{ background: "#f2f5f9", fontFamily: "sans-serif" }}>

      {/* HERO */}
      <div style={{
        height: "460px",
        backgroundImage: `url(http://localhost:4000/${pD?.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))"
        }} />

        <div style={{
          position: "absolute",
          bottom: "50px",
          left: "60px",
          color: "#fff"
        }}>
          <h1 style={{ fontSize: "44px", fontWeight: "800", marginBottom: "10px" }}>
            {pD?.name}
          </h1>

          <p style={{ fontSize: "18px", opacity: 0.9 }}>
            📍 {locationdata.location?.find(v => v.id == pD?.location_id)?.name}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        gap: "30px",
        padding: "30px 20px"
      }}>

        {/* LEFT CONTENT */}
        <div style={{ flex: 3 }}>

          {/* PACKAGE INFO */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            marginBottom: "25px"
          }}>
            <h2 style={{ fontWeight: "700", marginBottom: "5px", fontSize:"20px" }}>
              {pD?.name}
            </h2>

            <p style={{ color: "#666", marginBottom: "10px", fontSize:"18px" }}>
              ⏱ {pD?.duration}
            </p>

            <p style={{ color: "#444", lineHeight: "1.6", fontSize:"14px" }}>
              Experience a perfect getaway with curated experiences, comfort stays,
              and guided tours designed for unforgettable memories.
            </p>
          </div>

          {/* ITINERARY */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)"
          }}>
            <h2 style={{ marginBottom: "20px" }}>🗺️ Itinerary</h2>

            <img
              src={"http://localhost:4000/" + fit?.itineary_img}
              alt=""
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "25px"
              }}
            />

            <div style={{
              borderLeft: "3px solid #0d6efd",
              paddingLeft: "20px"
            }}>
              {fit?.description?.split("\n").map((item, index) => (
                <div key={index} style={{
                  marginBottom: "20px",
                  position: "relative"
                }}>
                  <span style={{
                    position: "absolute",
                    left: "-28px",
                    top: "6px",
                    width: "14px",
                    height: "14px",
                    background: "#0d6efd",
                    borderRadius: "50%",
                    boxShadow: "0 0 0 4px #e7f1ff"
                  }} />

                  <p style={{
                    margin: 0,
                    color: "#444",
                    lineHeight: "1.7",
                    fontSize: "15px"
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE BOOKING CARD */}
        <div style={{ flex: 1 }}>

          <div style={{
            position: "sticky",
            top: "100px",
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
          }}>
            <h3 style={{ marginBottom: "10px" }}>Starting From</h3>

            <h1 style={{
              color: "#0d6efd",
              fontWeight: "800",
              marginBottom: "15px"
            }}>
              ₹ {pD?.price}
            </h1>

            <p style={{ color: "#666", marginBottom: "20px" }}>
              Per person 
            </p>

            <NavLink to="/BookPackage">
              <button style={{
                width: "100%",
                background: "#0d6efd",
                color: "#fff",
                border: "none",
                padding: "14px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={(e)=> e.target.style.background="#0b5ed7"}
              onMouseOut={(e)=> e.target.style.background="#0d6efd"}
              >
                Book Now
              </button>
            </NavLink>

            

          </div>

        </div>

      </div>
    </div>
  );
}

export default PackageDetails;