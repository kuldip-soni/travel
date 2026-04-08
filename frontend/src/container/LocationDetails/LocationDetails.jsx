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

  const [transportQty, setTransportQty] = useState(0);
  const [hotelQty, setHotelQty] = useState(0);
  const [restaurantQty, setRestaurantQty] = useState(0);

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);

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

  const selectedTransport = transportdata?.transport?.find(t => t.id === selectedTransportId);
  const selectedHotel = hoteldata?.hotel?.find(h => h.id === selectedHotelId);
  const selectedRestaurant = restaurantdata?.restaurant?.find(r => r.id === selectedRestaurantId);

  // Passenger
  const addPassenger = () => setPassengers([...passengers, { name: "", age: "" }]);
  const removePassenger = (i) => setPassengers(passengers.filter((_, index) => index !== i));
  const handlePassengerChange = (i, field, value) => {
    const updated = [...passengers];
    updated[i][field] = value;
    setPassengers(updated);
  };

  // Price
  const totalPassengers = passengers.length;
  const transportPrice = (selectedTransport?.amount || 0) * transportQty;
  const hotelPrice = (selectedHotel?.amount || 0) * hotelQty;
  const restaurantPrice = (selectedRestaurant?.amount || 0) * restaurantQty;
  const finalPrice = totalPassengers * (transportPrice + hotelPrice + restaurantPrice);

  // Styles
  const container = { maxWidth: "1200px", margin: "auto", padding: "20px" };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px"
  };

  const cardStyle = (isSelected) => ({
    padding: "15px",
    borderRadius: "14px",
    background: "#fff",
    border: isSelected ? "2px solid #007bff" : "1px solid #ddd",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "0.3s"
  });

  const btnStyle = {
    padding: "4px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer"
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  };

  return (
    <div style={container}>

      {/* HERO */}
      <div style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        height: "300px",
        marginBottom: "30px"
      }}>
        <img
          src={"http://localhost:4000/" + lD?.image}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(70%)" }}
        />
        <div style={{ position: "absolute", bottom: "20px", left: "20px", color: "#fff" }}>
          <h1>{lD?.name}</h1>
          <p>{lD?.description}</p>
        </div>
      </div>

      {/* PASSENGERS */}
      <h3>Passenger Details</h3>
      {passengers.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input style={inputStyle} placeholder="Name" value={p.name}
            onChange={(e) => handlePassengerChange(i, "name", e.target.value)} />
          <input style={inputStyle} type="number" placeholder="Age" value={p.age}
            onChange={(e) => handlePassengerChange(i, "age", e.target.value)} />
          <button onClick={addPassenger}>+</button>
          {passengers.length > 1 && <button onClick={() => removePassenger(i)}>-</button>}
        </div>
      ))}

      {/* SUMMARY */}
      <div style={{
        background: "#f1f3f5",
        padding: "20px",
        borderRadius: "12px",
        margin: "30px 0"
      }}>
        <h3>Selected Options</h3>
        <p>Transport: ₹{transportPrice}</p>
        <p>Hotel: ₹{hotelPrice}</p>
        <p>Restaurant: ₹{restaurantPrice}</p>
        <p>Total Passengers: {totalPassengers}</p>
        <h2 style={{ color: "#007bff" }}>Final Price: ₹{finalPrice}</h2>
      </div>

      {/* TRANSPORT */}
      <h2>Select Transport</h2>
      <div style={grid}>
        {transportdata?.transport?.filter(v => v.location_id == id)?.map(vv => (
          <div key={vv.id}
            style={cardStyle(selectedTransportId === vv.id)}
            onClick={() => { setSelectedTransportId(vv.id); setTransportQty(1); }}>
            <h4>{vv.from} - {vv.to}</h4>
            <p>₹{vv.amount}</p>

            {selectedTransportId === vv.id && (
              <div style={{ marginTop: "10px" }}>
                <button style={btnStyle} onClick={(e) => { e.stopPropagation(); setTransportQty(Math.max(0, transportQty - 1)); }}>-</button>
                <span style={{ margin: "0 10px" }}>{transportQty}</span>
                <button style={btnStyle} onClick={(e) => { e.stopPropagation(); setTransportQty(transportQty + 1); }}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* HOTEL */}
      <h2 style={{ marginTop: "30px" }}>Select Hotel</h2>
      <div style={grid}>
        {hoteldata?.hotel?.filter(v => v.location_id == id)?.map(vv => (
          <div key={vv.id}
            style={cardStyle(selectedHotelId === vv.id)}
            onClick={() => { setSelectedHotelId(vv.id); setHotelQty(1); }}>
            <img src={"http://localhost:4000/" + vv.hotel_img}
              style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "10px" }} />
            <p>₹{vv.amount}</p>

            {selectedHotelId === vv.id && (
              <div style={{ marginTop: "10px" }}>
                <button style={btnStyle} onClick={(e) => { e.stopPropagation(); setHotelQty(Math.max(0, hotelQty - 1)); }}>-</button>
                <span style={{ margin: "0 10px" }}>{hotelQty}</span>
                <button style={btnStyle} onClick={(e) => { e.stopPropagation(); setHotelQty(hotelQty + 1); }}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RESTAURANT */}
      <h2 style={{ marginTop: "30px" }}>Select Restaurant</h2>
      <div style={grid}>
        {restaurantdata?.restaurant?.filter(v => v.location_id == id)?.map(vv => (
          <div key={vv.id}
            style={cardStyle(selectedRestaurantId === vv.id)}
            onClick={() => { setSelectedRestaurantId(vv.id); setRestaurantQty(1); }}>
            <img src={"http://localhost:4000/" + vv.restaurant_img}
              style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "10px" }} />
            <p>₹{vv.amount}</p>

            {selectedRestaurantId === vv.id && (
              <div style={{ marginTop: "10px" }}>
                <button style={btnStyle} onClick={(e) => { e.stopPropagation(); setRestaurantQty(Math.max(0, restaurantQty - 1)); }}>-</button>
                <span style={{ margin: "0 10px" }}>{restaurantQty}</span>
                <button style={btnStyle} onClick={(e) => { e.stopPropagation(); setRestaurantQty(restaurantQty + 1); }}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PACKAGES */}
      <h2 style={{ marginTop: "40px" }}>Packages</h2>
      <div style={grid}>
        {pD?.map(v2 => (
          <NavLink key={v2.id} to={`/packagedetails/${v2.id}`}>
            <div style={{
              background: "#fff",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}>
              <img src={`http://localhost:4000/${v2.image}`}
                style={{ width: "100%", height: "180px", objectFit: "cover" }} />
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