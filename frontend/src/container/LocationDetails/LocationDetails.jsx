import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

  const navigate = useNavigate();

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
      amount: 0,
    },
    validationSchema: Paymentschema,
    onSubmit: (values, { resetForm }) => {
      // add
      dispatch(bookCustomized({ ...values, user_id: localStorage.getItem("user_id"), location_id: id }))
      alert("Our customer support reprentive contact you within 24 hours. Thank you.")
      resetForm();
      navigate("/myBooking");
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

  useEffect(() => {
    paymentFormik.setFieldValue("amount", finalPrice);
  }, [finalPrice]);

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
      <div style={{
        position: "relative",
        height: "380px",
        marginTop: "90px",
        marginBottom: "40px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
      }}>

        {/* Background Image */}
        <img
          src={"http://localhost:4000/" + lD?.image}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%", // 👈 better focus (adjust if needed)
            transform: "scale(1.05)", // slight zoom for premium feel
          }}
        />

        {/* Gradient Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)"
        }} />

        {/* Content */}
        <div style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          color: "#fff"
        }}>
          <h1 style={{
            margin: 0,
            fontSize: "32px",
            fontWeight: "600",
            letterSpacing: "1px"
          }}>
            {lD?.name || "Explore Destination"}
          </h1>

          <p style={{
            marginTop: "8px",
            fontSize: "14px",
            opacity: 0.9
          }}>
            Plan your perfect trip with comfort & ease ✈️
          </p>
        </div>

      </div>
      <form onSubmit={paymentFormik.handleSubmit} id="payment-form">
        {/* PASSENGERS */}
        <div style={{
          background: "#fff",
          padding: "15px 20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "20px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px"
          }}>

            <h3 style={{ margin: 0 }}> Travel Date </h3>

            <TextField
              error={paymentFormik.errors.travel_date && paymentFormik.touched.travel_date}
              id="travel_date"
              name="travel_date"
              type="date"
              fullWidth
              size="small"
              inputProps={{
                min: new Date().toISOString().split("T")[0]
              }}
              onChange={paymentFormik.handleChange}
              onBlur={paymentFormik.handleBlur}
              value={paymentFormik.values.travel_date}
              helperText={
                paymentFormik.errors.travel_date && paymentFormik.touched.travel_date
                  ? paymentFormik.errors.travel_date
                  : ''
              }
            />
          </div>
        </div>


        {/* PASSENGERS  DETAILS*/}
        <div style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          marginBottom: "30px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <h3 style={{ margin: 0 }}>Passenger Details</h3>

            {/* Add Passenger Button (TOP RIGHT - better UX) */}
            <button
              type="button"
              onClick={addPassenger}
              style={{
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              + Add
            </button>
          </div>

          {paymentFormik.values.passengers.map((p, i) => (
            <div key={i} style={{
              marginBottom: "18px",
              padding: "16px",
              borderRadius: "12px",
              background: "#f9fafb",
              border: "1px solid #eee"
            }}>

              {/* Header Row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px"
              }}>
                <span style={{ fontWeight: "500", color: "#333" }}>
                  Passenger {i + 1}
                </span>

                {paymentFormik.values.passengers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = paymentFormik.values.passengers.filter((_, index) => index !== i);
                      paymentFormik.setFieldValue("passengers", updated);
                    }}
                    style={{
                      background: "#ff4d4f",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontSize: "12px"
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Input Row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "12px"
              }}>
                <TextField
                  label="Full Name"
                  value={p.name}
                  size="small"
                  fullWidth
                  onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
                />

                <TextField
                  label="Age"
                  type="number"
                  size="small"
                  fullWidth
                  onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
                  value={p.age}
                />
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div style={{
          background: "#ffffff",
          padding: "20px",
          margin: "25px 0",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          border: "1px solid #eee"
        }}>

          {/* Title */}
          <h3 style={{
            marginBottom: "15px",
            fontWeight: "600"
          }}>
            Booking Summary
          </h3>

          {/* Price Breakdown */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "14px",
            color: "#555"
          }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Transport</span>
              <span>₹{transportPrice}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Hotel</span>
              <span>₹{hotelPrice}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Restaurant</span>
              <span>₹{restaurantPrice}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Passengers</span>
              <span>{totalPassengers}</span>
            </div>

          </div>

          {/* Divider */}
          <div style={{
            height: "1px",
            background: "#eee",
            margin: "15px 0"
          }} />

          {/* Total */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{
              fontSize: "16px",
              fontWeight: "600"
            }}>
              Total Amount
            </span>

            <span style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#007bff"
            }}>
              ₹{finalPrice}
            </span>
          </div>

        </div>



        {/* SECTION TOGGLE */}
        <div style={{
          display: "flex",
          gap: "10px",
          margin: "25px 0",
          background: "#f1f3f5",
          padding: "6px",
          borderRadius: "12px",
          width: "fit-content"
        }}>

          {[
            { key: "transport", label: "Transport 🚗" },
            { key: "hotel", label: "Hotel 🏨" },
            { key: "restaurant", label: "Restaurant 🍽️" }
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "0.3s",
                background: activeSection === tab.key ? "#ffffff" : "transparent",
                color: activeSection === tab.key ? "#007bff" : "#555",
                boxShadow: activeSection === tab.key
                  ? "0 4px 10px rgba(0,0,0,0.1)"
                  : "none"
              }}
            >
              {tab.label}
            </div>
          ))}

        </div>

        {/* TRANSPORT */}
        {activeSection === "transport" && (
          <>
            <h2 style={{ marginBottom: "15px" }}>Select Transport</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px"
            }}>
              {transportdata?.transport
                ?.filter(v => v.location_id == id && v.booking_id == 0)
                ?.map(vv => {

                  const isSelected = paymentFormik.values.selectedTransportId === vv.id;

                  return (
                    <div
                      key={vv.id}
                      onClick={() => {
                        if (isSelected) {
                          paymentFormik.setFieldValue("selectedTransportId", "");
                          paymentFormik.setFieldValue("transportQty", 0);
                        } else {
                          paymentFormik.setFieldValue("selectedTransportId", vv.id);
                          paymentFormik.setFieldValue("transportQty", 1);
                        }
                      }}
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        padding: "18px",
                        cursor: "pointer",
                        border: isSelected ? "2px solid #007bff" : "1px solid #eee",
                        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                        transition: "0.3s",
                        transform: isSelected ? "scale(1.02)" : "scale(1)"
                      }}
                    >

                      {/* Route */}
                      <h4 style={{
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333"
                      }}>
                        {vv.from} → {vv.to}
                      </h4>

                      {/* Price */}
                      <p style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#007bff",
                        marginBottom: "12px"
                      }}>
                        ₹{vv.amount}
                      </p>

                      {/* Selected Badge */}
                      {isSelected && (
                        <div style={{
                          fontSize: "12px",
                          color: "#28a745",
                          marginBottom: "8px"
                        }}>
                          ✔ Selected
                        </div>
                      )}

                      {/* Quantity Controls */}
                      {isSelected && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "10px",
                            background: "#f8f9fa",
                            padding: "8px",
                            borderRadius: "8px"
                          }}
                        >
                          <button
                            type="button"
                            style={{
                              background: "#dee2e6",
                              border: "none",
                              borderRadius: "6px",
                              padding: "5px 10px",
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              paymentFormik.setFieldValue(
                                "transportQty",
                                Math.max(1, paymentFormik.values.transportQty - 1)
                              );
                            }}
                          >
                            -
                          </button>

                          <span style={{ fontWeight: "500" }}>
                            {paymentFormik.values.transportQty}
                          </span>

                          <button
                            type="button"
                            style={{
                              background: "#007bff",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              padding: "5px 10px",
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              paymentFormik.setFieldValue(
                                "transportQty",
                                paymentFormik.values.transportQty + 1
                              );
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* HOTEL */}
        {activeSection === "hotel" && (
          <>
            <h2 style={{ marginBottom: "15px" }}>Select Hotel</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px"
            }}>
              {hoteldata?.hotel
                ?.filter(v => v.location_id == id && v.booking_id == 0)
                ?.map(vv => {

                  const isSelected = paymentFormik.values.selectedHotelId === vv.id;
                  const serviceData = service?.service?.find(v9 => v9.id == vv.service_id);

                  return (
                    <div
                      key={vv.id}
                      onClick={() => {
                        if (isSelected) {
                          paymentFormik.setFieldValue("selectedHotelId", "");
                          paymentFormik.setFieldValue("hotelQty", 0);
                          paymentFormik.setFieldValue("checkIn", "");
                          paymentFormik.setFieldValue("checkOut", "");
                        } else {
                          paymentFormik.setFieldValue("selectedHotelId", vv.id);
                          paymentFormik.setFieldValue("hotelQty", 1);
                        }
                      }}
                      style={{
                        background: "#fff",
                        borderRadius: "18px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: isSelected ? "2px solid #007bff" : "1px solid #eee",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                        transition: "0.3s",
                        transform: isSelected ? "scale(1.02)" : "scale(1)"
                      }}
                    >

                      {/* IMAGE */}
                      <img
                        src={"http://localhost:4000/" + vv.hotel_img}
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "cover"
                        }}
                      />

                      {/* CONTENT */}
                      <div style={{ padding: "15px" }}>

                        {/* Title */}
                        <h3 style={{ margin: "0 0 5px", fontSize: "16px" }}>
                          {serviceData?.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: "13px",
                          color: "#666",
                          marginBottom: "10px"
                        }}>
                          {serviceData?.description}
                        </p>

                        {/* Price */}
                        <p style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "#007bff",
                          marginBottom: "10px"
                        }}>
                          ₹{vv.amount} / per room
                        </p>

                        {/* Selected Badge */}
                        {isSelected && (
                          <div style={{
                            fontSize: "12px",
                            color: "#28a745",
                            marginBottom: "8px"
                          }}>
                            ✔ Selected
                          </div>
                        )}

                        {/* EXTRA OPTIONS */}
                        {isSelected && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              marginTop: "10px",
                              padding: "10px",
                              background: "#f8f9fa",
                              borderRadius: "10px"
                            }}
                          >

                            {/* Quantity */}
                            <div style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "10px"
                            }}>
                              <span>Rooms</span>

                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <button
                                  type="button"
                                  style={{
                                    background: "#dee2e6",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "4px 10px",
                                    cursor: "pointer"
                                  }}
                                  onClick={() => {
                                    paymentFormik.setFieldValue(
                                      "hotelQty",
                                      Math.max(1, paymentFormik.values.hotelQty - 1)
                                    );
                                  }}
                                >
                                  -
                                </button>

                                <span>{paymentFormik.values.hotelQty}</span>

                                <button
                                  type="button"
                                  style={{
                                    background: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "4px 10px",
                                    cursor: "pointer"
                                  }}
                                  onClick={() => {
                                    paymentFormik.setFieldValue(
                                      "hotelQty",
                                      paymentFormik.values.hotelQty + 1
                                    );
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Dates */}
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "8px",
                              marginBottom: "8px"
                            }}>
                              <input
                                type="date"
                                name="checkIn"
                                value={paymentFormik.values.checkIn}
                                onChange={paymentFormik.handleChange}
                                style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                              />

                              <input
                                type="date"
                                name="checkOut"
                                value={paymentFormik.values.checkOut}
                                min={paymentFormik.values.checkIn}
                                onChange={paymentFormik.handleChange}
                                style={{ padding: "6px", borderRadius: "6px", border: "1px solid #ccc" }}
                              />
                            </div>

                            {/* Days */}
                            <p style={{
                              fontSize: "12px",
                              color: "#555",
                              margin: 0
                            }}>
                              Stay: {days} day(s)
                            </p>

                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* RESTAURANT */}
        {activeSection === "restaurant" && (
          <>
            <h2 style={{ marginBottom: "15px" }}>Select Restaurant</h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px"
            }}>
              {restaurantdata?.restaurant
                ?.filter(v => v.location_id == id && v.booking_id == 0)
                ?.map(vv => {

                  const isSelected = paymentFormik.values.selectedRestaurantId === vv.id;
                  const serviceData = service?.service?.find(v9 => v9.id == vv.service_id);

                  return (
                    <div
                      key={vv.id}
                      onClick={() => {
                        if (isSelected) {
                          paymentFormik.setFieldValue("selectedRestaurantId", null);
                          paymentFormik.setFieldValue("restaurantQty", 0);
                        } else {
                          paymentFormik.setFieldValue("selectedRestaurantId", vv.id);
                          paymentFormik.setFieldValue("restaurantQty", 1);
                        }
                      }}
                      style={{
                        background: "#fff",
                        borderRadius: "18px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: isSelected ? "2px solid #ff6b00" : "1px solid #eee",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                        transition: "0.3s",
                        transform: isSelected ? "scale(1.02)" : "scale(1)"
                      }}
                    >

                      {/* IMAGE */}
                      <div style={{ position: "relative" }}>
                        <img
                          src={"http://localhost:4000/" + vv.restaurant_img}
                          style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "cover"
                          }}
                        />

                        {/* Price Tag */}
                        <div style={{
                          position: "absolute",
                          bottom: "10px",
                          right: "10px",
                          background: "#fff",
                          padding: "5px 10px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          fontSize: "13px"
                        }}>
                          ₹{vv.amount}
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div style={{ padding: "15px" }}>

                        {/* Name */}
                        <h3 style={{
                          margin: "0 0 5px",
                          fontSize: "16px"
                        }}>
                          {serviceData?.name}
                        </h3>

                        {/* Description */}
                        <p style={{
                          fontSize: "13px",
                          color: "#666",
                          marginBottom: "10px"
                        }}>
                          {serviceData?.description}
                        </p>

                        {/* Selected */}
                        {isSelected && (
                          <div style={{
                            fontSize: "12px",
                            color: "#28a745",
                            marginBottom: "8px"
                          }}>
                            ✔ Added to plan
                          </div>
                        )}

                        {/* Quantity */}
                        {isSelected && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginTop: "10px",
                              background: "#fff4e6",
                              padding: "8px",
                              borderRadius: "8px"
                            }}
                          >
                            <span style={{ fontSize: "13px" }}>Meals</span>

                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <button
                                style={{
                                  background: "#ffd8a8",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  paymentFormik.setFieldValue(
                                    "restaurantQty",
                                    Math.max(1, paymentFormik.values.restaurantQty - 1)
                                  );
                                }}
                              >
                                -
                              </button>

                              <span>{paymentFormik.values.restaurantQty}</span>

                              <button
                                style={{
                                  background: "#ff6b00",
                                  color: "#fff",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  paymentFormik.setFieldValue(
                                    "restaurantQty",
                                    paymentFormik.values.restaurantQty + 1
                                  );
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
        <br /><br />

        {/* PAYMENT */}
        <div style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "18px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          marginTop: "30px",
          border: "1px solid #eee"
        }}>

          {/* Title */}
          <h3 style={{ marginBottom: "20px" }}>
            Payment Details 💳
          </h3>

          {/* Grid Layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px"
          }}>

            {/* Payment Mode */}
            <TextField
              // label="Payment Mode"
              name="mode"
              select
              fullWidth
              size="small"
              value={paymentFormik.values.mode}
              onChange={paymentFormik.handleChange}
              onBlur={paymentFormik.handleBlur}
              error={paymentFormik.errors.mode && paymentFormik.touched.mode}
              helperText={
                paymentFormik.errors.mode && paymentFormik.touched.mode
                  ? paymentFormik.errors.mode
                  : ''
              }
              SelectProps={{ native: true }}
            >
              <option value="">Select Mode</option>
              {mode.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            {/* Transaction ID */}
            <TextField
              label="Transaction ID"
              name="transaction_id"
              fullWidth
              size="small"
              value={paymentFormik.values.transaction_id}
              onChange={paymentFormik.handleChange}
              onBlur={paymentFormik.handleBlur}
              error={paymentFormik.errors.transaction_id && paymentFormik.touched.transaction_id}
              helperText={
                paymentFormik.errors.transaction_id && paymentFormik.touched.transaction_id
                  ? paymentFormik.errors.transaction_id
                  : ''
              }
            />

            {/* Payment Date */}
            <TextField
              label="Payment Date"
              type="date"
              name="date"
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
              value={paymentFormik.values.date}
              onChange={paymentFormik.handleChange}
              onBlur={paymentFormik.handleBlur}
              error={paymentFormik.errors.date && paymentFormik.touched.date}
              helperText={
                paymentFormik.errors.date && paymentFormik.touched.date
                  ? paymentFormik.errors.date
                  : ''
              }
            />

            {/* Amount */}
            <TextField
              label="Amount"
              type="number"
              name="amount"
              fullWidth
              size="small"
              value={paymentFormik.values.amount}
              InputProps={{ readOnly: true }}
            />

          </div>


          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            style={{
              marginTop: "20px",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "10px",
              background: "#007bff"
            }}
          >
            Confirm Booking 🚀
          </Button>

        </div>
      </form>

    </div>
  );
}

export default LocationDetails;