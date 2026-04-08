import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getlocation } from '../../redux/slice/location.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { gettransport } from '../../redux/slice/transport.slice';
import { gethotel } from '../../redux/slice/hotel.slice';
import { getrestaurant } from '../../redux/slice/restaurant.slice';

function LocationDetails() {
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
  const pD = packagedata.package?.filter(v => v.location_id == id);

  // Selected items
  const selectedTransport = transportdata?.transport?.find(t => t.id === selectedTransportId);
  const selectedHotel = hoteldata?.hotel?.find(h => h.id === selectedHotelId);
  const selectedRestaurant = restaurantdata?.restaurant?.find(r => r.id === selectedRestaurantId);

  const cardStyle = (isSelected) => ({
    padding: "25px",
    background: isSelected ? "#e0f7fa" : "#fff",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: isSelected
      ? "0 0 0 3px #080900, 0 12px 30px rgba(0,0,0,0.2)"
      : "0 6px 20px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer"
  });

  // Toggle function for vendors
  const toggleSelection = (currentId, setter, idToSelect) => {
    setter(currentId === idToSelect ? null : idToSelect);
  };

  return (
    <div style={{ marginTop: "90px", padding: "20px 40px" }}>

      {/* HERO */}
      <div style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        marginBottom: "50px",
        height: "420px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
      }}>
        <img
          src={"http://localhost:4000/" + lD?.image}
          alt={lD?.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(70%)" }}
        />
        <div style={{ position: "absolute", bottom: "40px", left: "40px", color: "#fff" }}>
          <h1>{lD?.name}</h1>
          <p>{lD?.description}</p>
        </div>
      </div>

      {/* Selected Prices */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Selected Options:</h3>
        <p>Transport Price: ₹{selectedTransport?.amount || "None"}</p>
        <p>Hotel Price: ₹{selectedHotel?.amount || "None"}</p>
        <p>Restaurant Price: ₹{selectedRestaurant?.amount || "None"}</p>
      </div>

      {/* TRANSPORT */}
      <h2>🤝 Select Transport</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {transportdata?.transport
          ?.filter(v => v.location_id == id)
          ?.map(vv => (
            <div
              key={vv.id}
              style={cardStyle(selectedTransportId === vv.id)}
              onClick={() => toggleSelection(selectedTransportId, setSelectedTransportId, vv.id)}
            >
              <h4>{vv.from} - {vv.to}</h4>
              <p>₹{vv.amount}</p>
            </div>
          ))}
      </div>

      {/* HOTEL */}
      <h2 style={{ marginTop: "40px" }}>🤝 Select Hotel</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {hoteldata?.hotel
          ?.filter(v => v.location_id == id)
          ?.map(vv => (
            <div
              key={vv.id}
              style={cardStyle(selectedHotelId === vv.id)}
              onClick={() => toggleSelection(selectedHotelId, setSelectedHotelId, vv.id)}
            >
              <img src={"http://localhost:4000/" + vv.hotel_img} style={{ width: "100%", height: "120px" }} />
              <h4>₹{vv.amount}</h4>
            </div>
          ))}
      </div>

      {/* RESTAURANT */}
      <h2 style={{ marginTop: "40px" }}>🤝 Select Restaurant</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {restaurantdata?.restaurant
          ?.filter(v => v.location_id == id)
          ?.map(vv => (
            <div
              key={vv.id}
              style={cardStyle(selectedRestaurantId === vv.id)}
              onClick={() => toggleSelection(selectedRestaurantId, setSelectedRestaurantId, vv.id)}
            >
              <img src={"http://localhost:4000/" + vv.restaurant_img} style={{ width: "100%", height: "120px" }} />
              <h4>₹{vv.amount}</h4>
            </div>
          ))}
      </div>

      {/* PACKAGES */}
      <h2 style={{ marginTop: "50px" }}>✈️ Packages</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
        {pD?.map(v2 => (
          <NavLink key={v2.id} to={`/packagedetails/${v2.id}`}>
            <div style={{ background: "#fff", padding: "10px" }}>
              <img src={`http://localhost:4000/${v2.image}`} style={{ width: "100%", height: "200px" }} />
              <h4>{v2.name}</h4>
              <p>{v2.duration}</p>
              <h3>₹{v2.price}</h3>
            </div>
          </NavLink>
        ))}
      </div>

    </div>
  );
}

export default LocationDetails;