import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const Dashboard = ({
  bookings = [],
  payments = [],
  packages = [],
  locations = [],
  hotels = [],
  transport = [],
  restaurants = []
}) => {

  const metrics = useMemo(() => ({
    totalPackages: packages.length,
    totalLocations: locations.length,
    totalBookings: bookings.length,
    totalRevenue: payments
      .filter(p => p.status === "complete")
      .reduce((sum, p) => sum + p.amount, 0),
    totalCustomizedPackages: bookings.filter(b => b.type === "customized_package").length,
    totalHotels: hotels.length,
    totalTransport: transport.length,
    totalRestaurants: restaurants.length
  }), [bookings, payments, packages, locations, hotels, transport, restaurants]);

  const paymentMap = useMemo(() => {
    return Object.fromEntries(payments.map(p => [p.booking_id, p]));
  }, [payments]);

  const revenueData = useMemo(() => {
    const data = {};
    payments.filter(p => p.status === "complete").forEach(p => {
      const month = new Date(p.date).toLocaleString("default", { month: "short" });
      data[month] = (data[month] || 0) + p.amount;
    });

    return Object.keys(data).map(k => ({ month: k, revenue: data[k] }));
  }, [payments]);

  const bookingData = useMemo(() => {
    const data = {};
    bookings.forEach(b => {
      const date = new Date(b.travel_date).toISOString().split("T")[0];
      data[date] = (data[date] || 0) + 1;
    });

    return Object.keys(data).map(k => ({ date: k, bookings: data[k] }));
  }, [bookings]);

  const recentBookings = useMemo(() => {
    return [...bookings]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(b => ({
        ...b,
        amount: paymentMap[b.id]?.amount || null,
        paymentStatus: paymentMap[b.id]?.status || b.status
      }));
  }, [bookings, paymentMap]);

  const pendingPayments = useMemo(() => {
    return bookings
      .filter(b => {
        const p = paymentMap[b.id];
        return !p || p.status === "pending";
      })
      .map(b => ({
        ...b,
        amount: paymentMap[b.id]?.amount || null,
        paymentStatus: paymentMap[b.id]?.status || "pending"
      }));
  }, [bookings, paymentMap]);

  return (
    <div style={styles.container}>

      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.subtitle}>Overview of your system</p>
      </div>

      {/* Cards */}
      <div style={styles.cardGrid}>
        <Card title="Packages" value={metrics.totalPackages} color="#3b82f6" />
        <Card title="Locations" value={metrics.totalLocations} color="#8b5cf6" />
        <Card title="Bookings" value={metrics.totalBookings} color="#22c55e" />
        <Card title="Revenue" value={`₹${metrics.totalRevenue}`} color="#f59e0b" />
        <Card title="Customized" value={metrics.totalCustomizedPackages} color="#ec4899" />
        <Card title="Hotels" value={metrics.totalHotels} color="#6366f1" />
        <Card title="Transport" value={metrics.totalTransport} color="#f97316" />
        <Card title="Restaurants" value={metrics.totalRestaurants} color="#14b8a6" />
      </div>

      {/* Charts */}
      <div style={styles.grid2}>
        <div style={styles.card}>
          <h3>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.card}>
          <h3>Bookings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div style={styles.grid2}>
        <Table title="Recent Bookings" data={recentBookings} />
        <Table title="Pending Payments" data={pendingPayments} />
      </div>

    </div>
  );
};

// Card
const Card = ({ title, value, color }) => (
  <div style={styles.cardBox}>
    <div>
      <p style={{ color: "#777" }}>{title}</p>
      <h2>{value}</h2>
    </div>
    <div style={{ ...styles.dot, backgroundColor: color }} />
  </div>
);

// Table
const Table = ({ title, data }) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Date</th>
          <th>Passenger</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.location_id}</td>
            <td>{row.travel_date?.split("T")[0]}</td>
            <td>{row.passenger}</td>
            <td>₹{row.amount || "-"}</td>
            <td><StatusBadge status={row.paymentStatus} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Status Badge
const StatusBadge = ({ status }) => {
  const colors = {
    complete: "#22c55e",
    pending: "#f59e0b",
    failed: "#ef4444"
  };

  return (
    <span style={{
      padding: "4px 10px",
      borderRadius: "20px",
      background: colors[status] + "20",
      color: colors[status],
      fontSize: "12px"
    }}>
      {status}
    </span>
  );
};

// Styles
const styles = {
  container: {
    padding: "20px",
    background: "#f3f4f6",
    minHeight: "100vh"
  },
  header: {
    marginBottom: "20px"
  },
  title: {
    margin: 0
  },
  subtitle: {
    color: "#666"
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px"
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },
  cardBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
  },
  dot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%"
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse"
  }
};

export default Dashboard;