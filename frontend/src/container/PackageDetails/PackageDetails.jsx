import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getpackage } from '../../redux/slice/package.slice';
import { getitineary } from '../../redux/slice/itineary.slice';
import { getlocation } from '../../redux/slice/location.slice';


function PackageDetails(props) {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getpackage());
    dispatch(getitineary());
    dispatch(getlocation());

  }, []);

  const { id } = useParams();
  const packagedata = useSelector(State => State.package);

  const itnorydata = useSelector(State => State.itineary);
  console.log(itnorydata.itineary);


  const pD = packagedata.package?.find((v) => v.id == id);
  console.log(pD);

  const fit = itnorydata.itineary?.find(v => v.package_id === pD.id);
  console.log(fit);

  const locationdata = useSelector(state => state.location);
  console.log(locationdata);





  return (
    <div style={{ marginTop: "90px", background: "#eef2f7" }}>

      {/* HERO SECTION */}
      <div
        style={{
          height: "420px",
          backgroundImage: `url(http://localhost:4000/${pD?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative"
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
          }}
        />

        {/* Text */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "60px",
            color: "#fff"
          }}
        >
          <h1 style={{ fontSize: "40px", fontWeight: "800" }}>
            {pD?.name}
          </h1>

          <p style={{ fontSize: "16px", opacity: 0.9 }}>
            {
              locationdata.location?.find(v1 => v1.id == pD?.location_id)?.name
            }
          </p>
        </div>
      </div>

      {/* CONTENT WRAPPER */}
      <div style={{ maxWidth: "1100px", margin: "30px auto 40px", padding: "0 20px" }}>
        {/* PACKAGE CARD */}
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "25px 30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >
          <div>
            <h3 style={{ fontWeight: "700", marginBottom: "5px" }}>
              {pD?.name}
            </h3>
            <p style={{ color: "#666" }}>{pD?.duration}</p>
          </div>

          <div style={{ textAlign: "right" }}>
            <h2 style={{ color: "#0d6efd", fontWeight: "800" }}>
              ₹ {pD?.price}
            </h2>

            <NavLink to="/BookPackage">
              <button
                style={{
                  marginTop: "10px",
                  background: "#0d6efd",
                  color: "#fff",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "30px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Book Now
              </button>
            </NavLink>
          </div>
        </div>

        {/* ITINERARY */}
        <div
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
          }}
        >
          <h2 style={{ fontWeight: "700", marginBottom: "20px" }}>
            📍 Itinerary Plan
          </h2>

          {/* IMAGE */}
          <img
            src={"http://localhost:4000/" + fit?.itineary_img}
            alt="Itinerary"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: "14px",
              marginBottom: "25px"
            }}
          />

          {/* TIMELINE STYLE */}
          <div style={{ borderLeft: "3px solid #0d6efd", paddingLeft: "20px" }}>
            {fit?.description?.split("\n").map((item, index) => (
              <div key={index} style={{ marginBottom: "20px", position: "relative" }}>

                {/* Dot */}
                <span
                  style={{
                    position: "absolute",
                    left: "-28px",
                    top: "5px",
                    width: "12px",
                    height: "12px",
                    background: "#0d6efd",
                    borderRadius: "50%"
                  }}
                ></span>

                <p style={{ margin: 0, color: "#444", lineHeight: "1.6" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PackageDetails;