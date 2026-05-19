import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getmyBooking } from '../../redux/slice/bookpackage.slice';
import { useEffect } from 'react';
import { getpackage } from '../../redux/slice/package.slice';
import { getlocation } from '../../redux/slice/location.slice';
import { getPayment } from '../../redux/slice/payment.slice';
import { NavLink } from 'react-router-dom';

function MyBooking(props) {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getmyBooking());
    dispatch(getpackage());
    dispatch(getlocation());
    dispatch(getPayment());

  }, []);

  const mybook = useSelector(state => state.bookpackage);
  const packagedata = useSelector(state => state.package);
  const location = useSelector(state => state.location);
  const paymentdata = useSelector(state => state.payment);

  console.log(mybook.myBooking);
  console.log(packagedata.package);
  console.log(location.location);
  console.log(paymentdata.payment);

  return (

    <section
      id="Popular-Packages"
      style={{
        padding: "40px 20px",
        background: "#f5f7fa",
      }}
    >

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          My Booking
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >

          {mybook.myBooking?.map((v) => {

            const payment = paymentdata.payment?.find(
              (p) => p.booking_id == v.id
            );

            const currentStatus = payment?.status || v.status;

            const statusColor =
              currentStatus === "pending"
                ? { bg: "#fff3cd", color: "#856404" }
                : currentStatus === "complete"
                  ? { bg: "#d4edda", color: "#155724" }
                  : { bg: "#f8d7da", color: "#721c24" };

            return (

              <div className="col-6" key={v.id}>

                <NavLink
                  to={{
                    pathname: "/myBookingDetails",
                  }}
                  state={{ id: v.id }}
                  style={{ textDecoration: "none" }}
                >

                  <div
                    style={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                      transition: "0.3s",
                    }}
                  >

                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "5px",
                        color: "#000"
                      }}
                    >
                      {
                        location.location?.find(
                          (v1) => v1.id == v.location_id
                        )?.name
                      }
                    </h3>

                    <p
                      style={{
                        color: "#555",
                        marginBottom: "15px",
                      }}
                    >
                      {
                        packagedata.package?.find(
                          (v1) => v1.id == v.package_id
                        )?.name
                      }
                    </p>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                        marginBottom: "15px",
                        color: "#333"
                      }}
                    >

                      <span>
                        👥 {v.passenger} Passengers
                      </span>

                      <span>
                        📅 {new Date(v.travel_date).toLocaleDateString()}
                      </span>

                    </div>

                    <div
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "500",
                        width: "fit-content",
                        background: statusColor.bg,
                        color: statusColor.color,
                      }}
                    >
                      {currentStatus}
                    </div>

                  </div>

                </NavLink>

              </div>

            );
          })}

        </div>

      </div>

    </section>

  );
}

export default MyBooking;