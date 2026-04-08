import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getlocation } from '../../redux/slice/location.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { gettransport } from '../../redux/slice/transport.slice';
import { gethotel } from '../../redux/slice/hotel.slice';
import { getrestaurant } from '../../redux/slice/restaurant.slice';

function LocationDetails(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  useEffect(() => {
    dispatch(getlocation());
    dispatch(getpackage());
    dispatch(gettransport());
    dispatch(gethotel());
    dispatch(getrestaurant());
  }, [dispatch]);

  const locationdata = useSelector(state => state.location);
  const packagedata = useSelector(state => state.package);
  const transportdata = useSelector(state => state.transport);
  const hoteldata = useSelector(state => state.hotel);
  const restaurantdata = useSelector(state => state.restaurant);

  const lD = locationdata.location?.find(v => v.id == id);
  const pD = packagedata.package?.filter(v1 => v1.location_id == id);

  // Card hover and selected style
  const cardStyle = (isSelected) => ({
    padding: "25px",
    background: isSelected ? "#e0f7fa" : "#fff",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: isSelected ? "0 12px 30px rgba(0,0,0,0.2)" : "0 6px 20px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer"
  });

  return (
    <div style={{ marginTop: "90px", padding: "20px 40px" }}>
      
      {/* HERO SECTION */}
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          marginBottom: "50px",
          height: "420px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
        }}
      >
        <img
          src={"http://localhost:4000/" + lD?.image}
          alt={lD?.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(70%)" }}
        />
        <div style={{ position: "absolute", bottom: "40px", left: "40px", color: "#fff", maxWidth: "600px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "10px" }}>{lD?.name}</h1>
          <p style={{ fontSize: "15px", lineHeight: "1.6", color: "#eee" }}>{lD?.description}</p>
        </div>
      </div>

      {/* Selected Vendors Display */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Selected Options:</h3>
        <p>Transport ID: {selectedTransportId || "None"}</p>
        <p>Hotel ID: {selectedHotelId || "None"}</p>
        <p>Restaurant ID: {selectedRestaurantId || "None"}</p>
      </div>

      {/* TRANSPORT */}
      <div>
        <h2 style={{ marginBottom: "25px", fontWeight: "700" }}>🤝 Select Transport</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {transportdata?.transport
            ?.filter(v => v.location_id == id)
            ?.map(vv => (
              <div
                key={vv.id}
                style={cardStyle(selectedTransportId === vv.id)}
                onClick={() => setSelectedTransportId(vv.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = selectedTransportId === vv.id
                    ? "0 12px 30px rgba(0,0,0,0.2)"
                    : "0 6px 20px rgba(0,0,0,0.1)";
                }}
              >
                <h4 style={{ fontWeight: "700", fontSize: "18px", marginBottom: "5px" }}>
                  {vv.from} - {vv.to} <br /> ₹{vv.amount}
                </h4>
                <p style={{ fontSize: "13px", color: "#777" }}>Verified Travel Partner</p>
              </div>
            ))}
        </div>
      </div>

      {/* HOTEL */}
      <div>
        <h2 style={{ marginBottom: "25px", fontWeight: "700" }}>🤝 Select Hotel</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {hoteldata?.hotel
            ?.filter(v => v.location_id == id)
            ?.map(vv => (
              <div
                key={vv.id}
                style={cardStyle(selectedHotelId === vv.id)}
                onClick={() => setSelectedHotelId(vv.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = selectedHotelId === vv.id
                    ? "0 12px 30px rgba(0,0,0,0.2)"
                    : "0 6px 20px rgba(0,0,0,0.1)";
                }}
              >
                <img src={"http://localhost:4000/" + vv.hotel_img} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} />
                <h4 style={{ fontWeight: "700", fontSize: "18px" }}>₹{vv.amount}</h4>
                <p style={{ fontSize: "13px", color: "#777" }}>Verified Travel Partner</p>
              </div>
            ))}
        </div>
      </div>

      {/* RESTAURANT */}
      <div>
        <h2 style={{ marginBottom: "25px", fontWeight: "700" }}>🤝 Select Restaurant</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {restaurantdata?.restaurant
            ?.filter(v => v.location_id == id)
            ?.map(vv => (
              <div
                key={vv.id}
                style={cardStyle(selectedRestaurantId === vv.id)}
                onClick={() => setSelectedRestaurantId(vv.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = selectedRestaurantId === vv.id
                    ? "0 12px 30px rgba(0,0,0,0.2)"
                    : "0 6px 20px rgba(0,0,0,0.1)";
                }}
              >
                <img src={"http://localhost:4000/" + vv.restaurant_img} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }} />
                <h4 style={{ fontWeight: "700", fontSize: "18px" }}>₹{vv.amount} per meal</h4>
                <p style={{ fontSize: "13px", color: "#777" }}>Verified Travel Partner</p>
              </div>
            ))}
        </div>
      </div>

      {/* PACKAGES */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{ marginBottom: "25px", fontWeight: "700" }}>✈️ Available Packages</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
          {pD?.map(v2 => (
            <NavLink
              to={`/packagedetails/${v2.id}`}
              key={v2.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "#fff",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
                }}
              >
                <img src={`http://localhost:4000/${v2.image}`} alt={v2.name} style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                <div style={{ padding: "15px" }}>
                  <h4 style={{ fontSize: "17px", fontWeight: "700" }}>{v2.name}</h4>
                  <p style={{ fontSize: "13px", color: "#777" }}>{v2.duration}</p>
                  <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "18px", fontWeight: "800", color: "#0d6efd" }}>₹ {v2.price}</span>
                    <button style={{ background: "#000", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "20px", fontSize: "12px", cursor: "pointer" }}>Book Now</button>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;