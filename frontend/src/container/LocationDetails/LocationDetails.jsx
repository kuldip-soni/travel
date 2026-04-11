import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getlocation } from '../../redux/slice/location.slice';
import { bookCustomized, getpackage } from '../../redux/slice/package.slice';
import { gettransport } from '../../redux/slice/transport.slice';
import { gethotel } from '../../redux/slice/hotel.slice';
import { getrestaurant } from '../../redux/slice/restaurant.slice';
import { array, date, number, object, string } from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getservice } from '../../redux/slice/service.slice';

const mode = [
  { value: 'online', label: 'online' },
  { value: 'cash', label: 'cash' },
];

function LocationDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  // ✅ Section toggle
  const [activeSection, setActiveSection] = useState("transport");

  // ✅ Selected vendors
  // const [selectedTransportId, setSelectedTransportId] = useState(null);
  // const [selectedHotelId, setSelectedHotelId] = useState(null);
  // const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  // const [transportQty, setTransportQty] = useState(0);
  // const [hotelQty, setHotelQty] = useState(0);
  // const [restaurantQty, setRestaurantQty] = useState(0);

  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");

  // const [passengers, setPassengers] = useState([{ name: "", age: "" }]);

  useEffect(() => {
    dispatch(getlocation());
    dispatch(getpackage());
    dispatch(gettransport());
    dispatch(gethotel());
    dispatch(getrestaurant());
    dispatch(getservice())
  }, [dispatch]);

  const service = useSelector(state => state.service) 

  const Paymentschema = object({
    travel_date: date().required(),
    passengers: array().of(
      object({
        name: string().required("Name required"),
        age: number().required("Age required").positive().integer(),
      })
    ),

    // selectedTransportId: string().required("Select transport"),
    // transportQty: number().min(1, "Qty must be > 0"),

    // selectedHotelId: string().required("Select hotel"),
    // hotelQty: number().min(1, "Qty must be > 0"),

    // checkOut: string()
    //   .required("Check-out required")
    //   .test("date-check", "Check-out must be after check-in", function (value) {
    //     const { checkIn, selectedHotelId } = this.parent;

    //     if (!selectedHotelId) return true; // skip if no hotel selected
    //     if (!checkIn || !value) return false;

    //     return new Date(value) > new Date(checkIn);
    //   }),
    // checkIn: string().test(
    //   "checkin-required",
    //   "Check-in required",
    //   function (value) {
    //     if (!this.parent.selectedHotelId) return true;
    //     return !!value;
    //   }
    // ),

    // selectedRestaurantId: string().required("Select restaurant"),
    // restaurantQty: number().min(1, "Qty must be > 0"),

    mode: string().required("Select mode"),
    transaction_id: string().required("Enter transaction id"),
    date: string().required("Select date"),
    amount: number().required("Enter amount"),
  });

  const paymentFormik = useFormik({
    initialValues: {
      travel_date: '',
      passengers: [{ name: "", age: "" }],
      selectedTransportId: "",
      transportQty: 0,

      selectedHotelId: "",
      hotelQty: 0,
      checkIn: "",
      checkOut: "",

      selectedRestaurantId: "",
      restaurantQty: 0,

      mode: "",
      transaction_id: "",
      date: "",
      amount: "",
    },
    validationSchema: Paymentschema,
    onSubmit: (values, { resetForm }) => {
      // add
      dispatch(bookCustomized({...values, user_id: localStorage.getItem("user_id"), location_id: id})) 
      // resetForm();
    },
  });

  const passengers = paymentFormik.values.passengers;

  const locationdata = useSelector(state => state.location);
  const transportdata = useSelector(state => state.transport);
  const hoteldata = useSelector(state => state.hotel);
  const restaurantdata = useSelector(state => state.restaurant);

  const lD = locationdata.location?.find(v => v.id == id);

  const selectedTransport = transportdata?.transport?.find(t => t.id === paymentFormik.values.selectedTransportId);
  const selectedHotel = hoteldata?.hotel?.find(h => h.id === paymentFormik.values.selectedHotelId);
  const selectedRestaurant = restaurantdata?.restaurant?.find(r => r.id === paymentFormik.values.selectedRestaurantId);

  // Passenger
  const removePassenger = (i) => setPassengers(passengers.filter((_, index) => index !== i));

  const addPassenger = () => {
    const updated = [...paymentFormik.values.passengers, { name: "", age: "" }];
    paymentFormik.setFieldValue("passengers", updated);
  };

  const handlePassengerChange = (i, field, value) => {
    const updated = [...paymentFormik.values.passengers];
    updated[i][field] = value;
    paymentFormik.setFieldValue("passengers", updated);
  };

  // Price
  const totalPassengers = passengers.length;
  const transportPrice =
    (selectedTransport?.amount || 0) * paymentFormik.values.transportQty;

  const days =
    paymentFormik.values.checkIn && paymentFormik.values.checkOut
      ? Math.max(
        1,
        (new Date(paymentFormik.values.checkOut) -
          new Date(paymentFormik.values.checkIn)) /
        (1000 * 60 * 60 * 24)
      )
      : 1;

  const hotelPrice = (selectedHotel?.amount || 0) * paymentFormik.values.hotelQty * days;
  const restaurantPrice = (selectedRestaurant?.amount || 0) * paymentFormik.values.restaurantQty;

  const finalPrice = (transportPrice + hotelPrice + restaurantPrice);

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

  const toggleBtn = (active) => ({
    padding: "10px 15px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "none",
    background: active ? "#007bff" : "#ccc",
    color: "#fff",
    cursor: "pointer"
  });

  console.log("paymentFormikpaymentFormik", paymentFormik.values);


  return (
    <div style={container}>

      {/* HERO */}
      <div style={{ height: "300px", marginBottom: "30px" }}>
        <img src={"http://localhost:4000/" + lD?.image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <form onSubmit={paymentFormik.handleSubmit} id="payment-form">
        {/* PASSENGERS */}
        <span>Travel Date: </span>
        <TextField
          error={paymentFormik.errors.travel_date && paymentFormik.touched.travel_date}
          id="travel_date"
          name="travel_date"
          type="date"
          variant="standard"
          onChange={paymentFormik.handleChange}
          onBlur={paymentFormik.handleBlur}
          value={paymentFormik.values.travel_date}
          helperText={paymentFormik.errors.travel_date && paymentFormik.touched.travel_date ? paymentFormik.errors.travel_date : ''}
        />
        <h3>Passenger Details</h3>

        <br /><br />
        {paymentFormik.values.passengers.map((p, i) => (
          <div key={i}>
            <input
              placeholder="Name"
              value={p.name}
              onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={p.age}
              onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
            />

            <button type="button" onClick={addPassenger}>+</button>
            {paymentFormik.values.passengers.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const updated = paymentFormik.values.passengers.filter((_, index) => index !== i);
                  paymentFormik.setFieldValue("passengers", updated);
                }}
              >
                -
              </button>
            )}
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



        {/* SECTION TOGGLE */}
        <div style={{ margin: "20px 0" }}>
          <button type="button" style={toggleBtn(activeSection === "transport")} onClick={() => setActiveSection("transport")}>Transport</button>
          <button type="button" style={toggleBtn(activeSection === "hotel")} onClick={() => setActiveSection("hotel")}>Hotel</button>
          <button type="button" style={toggleBtn(activeSection === "restaurant")} onClick={() => setActiveSection("restaurant")}>Restaurant</button>
        </div>

        {/* TRANSPORT */}
        {activeSection === "transport" && (
          <>
            <h2>Select Transport</h2>
            <div style={grid}>
              {transportdata?.transport?.filter(v => v.location_id == id)?.map(vv => (
                <div key={vv.id}
                  style={cardStyle(paymentFormik.values.selectedTransportId === vv.id)}
                  onClick={() => {
                    const current = paymentFormik.values.selectedTransportId;

                    if (current === vv.id) {
                      paymentFormik.setFieldValue("selectedTransportId", "");
                      paymentFormik.setFieldValue("transportQty", 0);
                    } else {
                      paymentFormik.setFieldValue("selectedTransportId", vv.id);
                      paymentFormik.setFieldValue("transportQty", 1);
                    }
                  }}>
                  <h4>{vv.from} - {vv.to}</h4>
                  <p>₹{vv.amount}</p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      paymentFormik.setFieldValue(
                        "transportQty",
                        Math.max(1, paymentFormik.values.transportQty - 1)
                      );
                    }}
                  >
                    -
                  </button>

                  <span>{paymentFormik.values.transportQty}</span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      paymentFormik.setFieldValue(
                        "transportQty",
                        paymentFormik.values.transportQty + 1
                      );
                    }}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* HOTEL */}
        {activeSection === "hotel" && (
          <>
            <h2>Select Hotel</h2>
            <div style={grid}>
              {hoteldata?.hotel?.filter(v => v.location_id == id && v.booking_id == 0)?.map(vv => (
                <div key={vv.id}
                  style={cardStyle(paymentFormik.values.selectedHotelId === vv.id)}
                  onClick={() => {
                    if (paymentFormik.values.selectedHotelId === vv.id) {
                      paymentFormik.setFieldValue("selectedHotelId", "")
                      paymentFormik.setFieldValue("hotelQty", 0)
                      paymentFormik.setFieldValue("checkIn", "")
                      paymentFormik.setFieldValue("checkOut", "")
                    } else {
                      paymentFormik.setFieldValue("selectedHotelId", vv.id)
                      paymentFormik.setFieldValue("hotelQty", 1)
                    }
                  }}>
                    <h2>{service?.service?.find(v9 => v9.id == vv.service_id)?.name}</h2>
                    <p>
                      {service?.service?.find(v9 => v9.id == vv.service_id)?.description}
                    </p>
                  <img src={"http://localhost:4000/" + vv.hotel_img}
                    style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <p>₹{vv.amount}</p>

                  {paymentFormik.values.selectedHotelId === vv.id && (
                    <div>
                      <button type="button" style={btnStyle} onClick={(e) => {
                        e.stopPropagation();
                        paymentFormik.setFieldValue("hotelQty", Math.max(0, paymentFormik.values.hotelQty - 1))
                      }}>-</button>
                      <span>{paymentFormik.values.hotelQty}</span>
                      <button type="button" style={btnStyle} onClick={(e) => {
                        e.stopPropagation();
                        paymentFormik.setFieldValue("hotelQty", paymentFormik.values.hotelQty + 1)
                      }}>+</button>

                      <input
                        type="date"
                        name="checkIn"
                        value={paymentFormik.values.checkIn}
                        onChange={paymentFormik.handleChange}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <input
                        type="date"
                        name="checkOut"
                        value={paymentFormik.values.checkOut}
                        min={paymentFormik.values.checkIn}
                        onChange={paymentFormik.handleChange}
                        onClick={(e) => e.stopPropagation()}
                      />

                      <p>Days: {days}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* RESTAURANT */}
        {activeSection === "restaurant" && (
          <>
            <h2>Select Restaurant</h2>
            <div style={grid}>
              {restaurantdata?.restaurant?.filter(v => v.location_id == id)?.map(vv => (
                <div key={vv.id}
                  style={cardStyle(paymentFormik.values.selectedRestaurantId === vv.id)}
                  onClick={() => {
                    if (paymentFormik.values.selectedRestaurantId === vv.id) {
                      paymentFormik.setFieldValue("selectedRestaurantId", null)
                      paymentFormik.setFieldValue("restaurantQty", 0)

                    } else {
                      paymentFormik.setFieldValue("selectedRestaurantId", vv.id)
                      paymentFormik.setFieldValue("restaurantQty", 1)

                    }
                  }}>
                    <h2>{service?.service?.find(v9 => v9.id == vv.service_id)?.name}</h2>
                    <p>
                      {service?.service?.find(v9 => v9.id == vv.service_id)?.description}
                    </p>
                  <img src={"http://localhost:4000/" + vv.restaurant_img}
                    style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                  <p>₹{vv.amount}</p>

                  {paymentFormik.values.selectedRestaurantId === vv.id && (
                    <div>
                      <button style={btnStyle} onClick={(e) => {
                        e.stopPropagation();
                        paymentFormik.setFieldValue("restaurantQty", Math.max(0, paymentFormik.values.restaurantQty - 1))
                      }}>-</button>
                      <span>{paymentFormik.values.restaurantQty}</span>
                      <button style={btnStyle} onClick={(e) => {
                        e.stopPropagation();
                        paymentFormik.setFieldValue("restaurantQty", Math.max(0, paymentFormik.values.restaurantQty + 1));
                      }}>+</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        <br /><br />

        {/* PAYMENT */}

        <TextField
          error={paymentFormik.errors.mode && paymentFormik.touched.mode}
          id="standard-select-currency-native"
          name="mode"
          select
          fullWidth

          slotProps={{
            select: {
              native: true,
            },
          }}
          variant="standard"
          onChange={paymentFormik.handleChange}
          onBlur={paymentFormik.handleBlur}
          value={paymentFormik.values.mode}
          helperText={paymentFormik.errors.mode && paymentFormik.touched.mode ? paymentFormik.errors.mode : ''}
        >
          <option value="">--Select mode--</option>
          {mode.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <br />

        <TextField
          error={paymentFormik.errors.transaction_id && paymentFormik.touched.transaction_id}
          id="transaction_id"
          name="transaction_id"
          type="text"
          label="transaction_id "
          fullWidth
          variant="standard"
          onChange={paymentFormik.handleChange}
          onBlur={paymentFormik.handleBlur}
          value={paymentFormik.values.transaction_id}
          helperText={paymentFormik.errors.transaction_id && paymentFormik.touched.transaction_id ? paymentFormik.errors.transaction_id : ''}
        />

        <TextField

          error={paymentFormik.errors.date && paymentFormik.touched.date}
          margin="dense"
          id="date"
          name="date"
          type="date"
          fullWidth
          variant="standard"
          onChange={paymentFormik.handleChange}
          onBlur={paymentFormik.handleBlur}
          value={paymentFormik.values.date}
          helperText={paymentFormik.errors.date && paymentFormik.touched.date ? paymentFormik.errors.date : ''}

        />

        <TextField

          error={paymentFormik.errors.amount && paymentFormik.touched.amount}
          margin="dense"
          id="amount"
          name="amount"
          label="amount"
          type="number"
          fullWidth
          variant="standard"
          onChange={paymentFormik.handleChange}
          onBlur={paymentFormik.handleBlur}
          value={paymentFormik.values.amount}
          helperText={paymentFormik.errors.amount && paymentFormik.touched.amount ? paymentFormik.errors.amount : ''}
        />
        <Button type="submit">Submit</Button>
      </form>

    </div>
  );
}

export default LocationDetails;