import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getlocation } from '../../redux/slice/location.slice';
import { getpackage } from '../../redux/slice/package.slice';
import { gettransport } from '../../redux/slice/transport.slice';
import { gethotel } from '../../redux/slice/hotel.slice';
import { getrestaurant } from '../../redux/slice/restaurant.slice';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const mode = [
  { value: 'online', label: 'online' },
  { value: 'cash', label: 'cash' },
];

function LocationDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [selectedTransportId, setSelectedTransportId] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [transportQty, setTransportQty] = useState(0);
  const [hotelQty, setHotelQty] = useState(0);
  const [restaurantQty, setRestaurantQty] = useState(0);

  // ✅ Added
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [passengers, setPassengers] = useState([{ name: "", age: "" }]);

  useEffect(() => {
    dispatch(getlocation());
    dispatch(getpackage());
    dispatch(gettransport());
    dispatch(gethotel());
    dispatch(getrestaurant());
  }, [dispatch]);

  let Paymentschema = object({
    mode: string().required('please select mode'),
    transaction_id: string().required('please enter transaction_id'),
    date: string().required('please select date'),
    amount: string().required('please enter amount'),
  });

  const paymentFormik = useFormik({
    initialValues: {
      mode: '',
      transaction_id: '',
      date: '',
      amount: '',
    },
    validationSchema: Paymentschema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

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

  // ✅ Hotel days calculation
  const days = checkIn && checkOut
    ? Math.max(1, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    : 1;

  const hotelPrice = (selectedHotel?.amount || 0) * hotelQty * days;
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
    cursor: "pointer"
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
      <div style={{ height: "300px", marginBottom: "30px" }}>
        <img
          src={"http://localhost:4000/" + lD?.image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* PASSENGERS */}
      <h3>Passenger Details</h3>
      {passengers.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input type="date" />
          <input style={inputStyle} placeholder="Name"
            value={p.name}
            onChange={(e) => handlePassengerChange(i, "name", e.target.value)} />
          <input style={inputStyle} type="number" placeholder="Age"
            value={p.age}
            onChange={(e) => handlePassengerChange(i, "age", e.target.value)} />
          <button onClick={addPassenger}>+</button>
          {passengers.length > 1 && <button onClick={() => removePassenger(i)}>-</button>}
        </div>
      ))}

      {/* SUMMARY */}
      <div style={{ background: "#f1f3f5", padding: "20px", margin: "20px 0" }}>
        <p>Transport: ₹{transportPrice}</p>
        <p>Hotel: ₹{hotelPrice}</p>
        <p>Restaurant: ₹{restaurantPrice}</p>
        <p>Passengers: {totalPassengers}</p>
        <h2>Total: ₹{finalPrice}</h2>
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
              <div>
                <button style={btnStyle}
                  onClick={(e) => { e.stopPropagation(); setTransportQty(Math.max(0, transportQty - 1)); }}>-</button>
                <span>{transportQty}</span>
                <button style={btnStyle}
                  onClick={(e) => { e.stopPropagation(); setTransportQty(transportQty + 1); }}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* HOTEL */}
      <h2>Select Hotel</h2>
      <div style={grid}>
        {hoteldata?.hotel?.filter(v => v.location_id == id)?.map(vv => (
          <div key={vv.id}
            style={cardStyle(selectedHotelId === vv.id)}
            onClick={() => { setSelectedHotelId(vv.id); setHotelQty(1); }}>

            <img src={"http://localhost:4000/" + vv.hotel_img}
              style={{ width: "100%", height: "140px", objectFit: "cover" }} />

            <p>₹{vv.amount}</p>

            {selectedHotelId === vv.id && (
              <div>

                <button style={btnStyle}
                  onClick={(e) => { e.stopPropagation(); setHotelQty(Math.max(0, hotelQty - 1)); }}>-</button>

                <span>{hotelQty}</span>

                <button style={btnStyle}
                  onClick={(e) => { e.stopPropagation(); setHotelQty(hotelQty + 1); }}>+</button>

                {/* Check-in */}
                <input type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Check-out */}
                <input type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />

                <p>Days: {days}</p>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* RESTAURANT */}
      <h2>Select Restaurant</h2>
      <div style={grid}>
        {restaurantdata?.restaurant?.filter(v => v.location_id == id)?.map(vv => (
          <div key={vv.id}
            style={cardStyle(selectedRestaurantId === vv.id)}
            onClick={() => { setSelectedRestaurantId(vv.id); setRestaurantQty(1); }}>
            <img src={"http://localhost:4000/" + vv.restaurant_img}
              style={{ width: "100%", height: "140px", objectFit: "cover" }} />
            <p>₹{vv.amount}</p>

            {selectedRestaurantId === vv.id && (
              <div>
                <button style={btnStyle}
                  onClick={(e) => { e.stopPropagation(); setRestaurantQty(Math.max(0, restaurantQty - 1)); }}>-</button>
                <span>{restaurantQty}</span>
                <button style={btnStyle}
                  onClick={(e) => { e.stopPropagation(); setRestaurantQty(restaurantQty + 1); }}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default LocationDetails;