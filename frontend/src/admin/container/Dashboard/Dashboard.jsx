import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LineChart, Line, BarChart, Bar,
    PieChart, Pie, Cell,
    XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { getdashboard, getrecentBooking, locationWisePayment, monthWiseRevenue } from "../../../redux/slice/dashboard.slice";
import { getbookpackage, getmyBooking } from "../../../redux/slice/bookpackage.slice";



const Dashboard = ({


    bookings = [],
    payments = [],
    packages = [],
    locations = [],
    hotels = [],
    transport = [],
    restaurants = []
}) => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getdashboard());

        dispatch(getbookpackage());

        dispatch(getrecentBooking());

        dispatch(locationWisePayment());

        dispatch(monthWiseRevenue())

    }, []);

    const dashboarddata = useSelector(state => state.dashboard);

    console.log(dashboarddata);

    const locWisePayment = dashboarddata?.locWisePayment?.map(item => ({
        location_name: item.location_name.trim(),
        total_revenue: Number(item.total_revenue)
    }));


    // console.log(recentBooking?.booking?.sort((a, b) => b.id - a.id));

    // ✅ Fallback Static Data
    const demoBookings = [
        { id: 1, location_id: "Goa", travel_date: "2025-04-10", passenger: 2, created_at: "2025-04-01", status: "complete" },
        { id: 2, location_id: "Manali", travel_date: "2025-04-15", passenger: 4, created_at: "2025-04-02", status: "pending" },
        { id: 3, location_id: "Delhi", travel_date: "2025-04-18", passenger: 1, created_at: "2025-04-03", status: "complete" }
    ];

    const demoPayments = [
        { booking_id: 1, amount: 15000, status: "complete", date: "2025-01-10" },
        { booking_id: 2, amount: 20000, status: "pending", date: "2025-02-15" },
        { booking_id: 3, amount: 10000, status: "complete", date: "2025-03-12" }
    ];

    const finalBookings = bookings.length ? bookings : demoBookings;
    const finalPayments = payments.length ? payments : demoPayments;

    // ✅ Metrics
    const metrics = useMemo(() => ({
        totalPackages: packages.length || 12,
        totalLocations: locations.length || 8,
        totalBookings: finalBookings.length,
        totalRevenue: finalPayments
            .filter(p => p.status === "complete")
            .reduce((sum, p) => sum + p.amount, 0),
        totalCustomizedPackages: finalBookings.filter(b => b.type === "customized_package").length || 3,
        totalHotels: hotels.length || 6,
        totalTransport: transport.length || 5,
        totalRestaurants: restaurants.length || 10
    }), [finalBookings, finalPayments, packages, locations, hotels, transport, restaurants]);

    const paymentMap = useMemo(() => {
        return Object.fromEntries(finalPayments.map(p => [p.booking_id, p]));
    }, [finalPayments]);

    // ✅ Charts Data
    const revenueData = useMemo(() => {
        const data = {};
        finalPayments.forEach(p => {
            if (p.status === "complete") {
                const month = new Date(p.date).toLocaleString("default", { month: "short" });
                data[month] = (data[month] || 0) + p.amount;
            }
        });
        return Object.keys(data).map(k => ({ month: k, revenue: data[k] }));
    }, [finalPayments]);

    const bookingData = useMemo(() => {
        const data = {};
        finalBookings.forEach(b => {
            const date = new Date(b.travel_date).toISOString().split("T")[0];
            data[date] = (data[date] || 0) + 1;
        });
        return Object.keys(data).map(k => ({ date: k, bookings: data[k] }));
    }, [finalBookings]);

    // ✅ Static Charts
    const pieData = [
        { name: "Jim Corbett National Park", value: 400 },
        { name: "Mumbai", value: 300 },
        { name: "Dwarka", value: 300 },
        { name: "Statue Of Unity", value: 200 }
    ];

    const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

    const staticBarData = [
        { month: "Jan", revenue: 12000 },
        { month: "Feb", revenue: 15000 },
        { month: "Mar", revenue: 10000 },
        { month: "Apr", revenue: 18000 },
        { month: "May", revenue: 22000 }
    ];

    // ✅ Tables
    const recentBookings = useMemo(() => {
        return [...finalBookings]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5)
            .map(b => ({
                ...b,
                amount: paymentMap[b.id]?.amount || null,
                paymentStatus: paymentMap[b.id]?.status || b.status
            }));
    }, [finalBookings, paymentMap]);

    const pendingPayments = useMemo(() => {
        return finalBookings
            .filter(b => {
                const p = paymentMap[b.id];
                return !p || p.status === "pending";
            })
            .map(b => ({
                ...b,
                amount: paymentMap[b.id]?.amount || null,
                paymentStatus: paymentMap[b.id]?.status || "pending"
            }));
    }, [finalBookings, paymentMap]);

    return (
        <div style={styles.container}>

            <div style={styles.header}>
                <h1 style={styles.title}>Admin Dashboard</h1>
                <p style={styles.subtitle}>Overview of your system</p>
            </div>

            {/* Cards */}
            <div style={styles.cardGrid}>
                <Card title="Locations" value={dashboarddata?.dashboard?.locations} color="#8b5cf6" />
                <Card title="Packages" value={dashboarddata?.dashboard?.packages} color="#3b82f6" />
                <Card title="Bookings" value={dashboarddata?.dashboard?.bookings} color="#22c55e" />
                <Card title="Revenue" value={`₹${dashboarddata?.dashboard?.revenue}`} color="#f59e0b" />

                <Card title="Customized" value={dashboarddata?.dashboard?.customized} color="#ec4899" />
                <Card title="Hotels" value={dashboarddata?.dashboard?.hotels} color="#6366f1" />
                <Card title="Transport" value={dashboarddata?.dashboard?.transport} color="#f97316" />
                <Card title="Restaurants" value={dashboarddata?.dashboard?.restaurants} color="#14b8a6" />
            </div>


            {/* Extra Charts */}
            <div style={styles.grid2}>
                <ChartCard title="Location wise Revenue">
                    <PieChart
                        width={300}
                        height={300}
                        style={{ outline: "none" }}
                        tabIndex={-1}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <Pie
                            data={locWisePayment}
                            dataKey="total_revenue"
                            nameKey="location_name"
                            outerRadius={100}
                            label
                        >
                            {locWisePayment?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ChartCard>

                <ChartCard title="Monthly Revenue (Static)">
                    <BarChart
                        data={dashboarddata?.monWisePayment}
                        style={{ outline: "none" }}
                        tabIndex={-1}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#6366f1" />
                    </BarChart>

                </ChartCard>
            </div>

            {/* Tables */}
            <div style={styles.grid2}>
                <Table title="Recent Bookings" data={dashboarddata?.recentBooking?.slice()?.sort((a, b) => b.id - a.id)} />
                {/* <Table title="Pending Payments" data={pendingPayments} /> */}
            </div>

        </div>
    );
};

// Reusable Chart Card
const ChartCard = ({ title, children }) => (
    <div style={styles.card}>
        <h3>{title}</h3>

        <div
            tabIndex={-1}
            style={{ outline: "none" }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <ResponsiveContainer width="100%" height={300}>
                {children}
            </ResponsiveContainer>
        </div>
    </div>
);
// Card
const Card = ({ title, value, color }) => (
    <div
        style={styles.cardBox}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
        }}
    >
        <div>
            <p style={{ color: "#777" }}>{title}</p>
            <h2>{value}</h2>
        </div>
        <div style={{ ...styles.dot, backgroundColor: color }} />
    </div>
);
// Table + Status same as before...

const Table = ({ title, data }) => (
    <div
        style={{
            background: "#fff",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
        }}
    >
        <h3 style={{ marginBottom: "12px", fontWeight: "600" }}>{title}</h3>

        <div style={{ width: "100%", overflowX: "auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: "600px"
                }}
            >
                <thead>
                    <tr style={{ background: "#f9fafb" }}>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Location</th>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Passenger</th>
                        <th style={thStyle}>Amount</th>
                        <th style={thStyle}>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {data?.length ? (
                        data?.map((row, index) => (
                            <tr
                                key={row.id}
                                style={{
                                    background: index % 2 === 0 ? "#fafafa" : "#ffffff",
                                    transition: "0.2s"
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.background = "#f1f5f9")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                    index % 2 === 0 ? "#fafafa" : "#ffffff")
                                }
                            >
                                <td style={tdStyle}>{row.id}</td>
                                <td style={tdStyle}>{row.name}</td>
                                <td style={tdStyle}>{new Date(row.travel_date)?.toLocaleDateString()}</td>
                                <td style={tdStyle}>{row.passenger}</td>
                                <td style={tdStyle}>₹{row.price || "-"}</td>
                                <td style={tdStyle}>
                                    <span
                                        style={{
                                            padding: "5px 10px",
                                            borderRadius: "20px",
                                            fontSize: "12px",
                                            fontWeight: "500",
                                            textTransform: "capitalize",
                                            background:
                                                row.status === "payment_complete"
                                                    ? "#dcfce7"
                                                    : "#fef3c7",
                                            color:
                                                row.status === "payment_complete"
                                                    ? "#166534"
                                                    : "#92400e"
                                        }}
                                    >
                                        {row.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                    color: "#888"
                                }}
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

// reusable inline styles
const thStyle = {
    padding: "10px",
    textAlign: "left",
    fontSize: "14px",
    borderBottom: "1px solid #e5e7eb"
};

const tdStyle = {
    padding: "10px",
    fontSize: "14px",
    borderBottom: "1px solid #f1f5f9"
};

const styles = {
    container: { padding: 20, background: "#f3f4f6", minHeight: "100vh" },
    header: { marginBottom: 20 },
    title: { margin: 0 },
    subtitle: { color: "#666" },
    cardGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // ✅ FIXED: exactly 4 per row
        gap: 20,
        marginTop: 20
    },
    cardBox: {
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        transition: "0.3s",
        cursor: "pointer"
    },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 },
    card: { background: "#fff", padding: 15, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
    dot: { width: 14, height: 14, borderRadius: "50%" },
    table: { width: "100%", marginTop: 10, borderCollapse: "collapse" }
};

export default Dashboard;