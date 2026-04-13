import React, { useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
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
    { name: "Packages", value: 400 },
    { name: "Hotels", value: 300 },
    { name: "Transport", value: 300 },
    { name: "Restaurants", value: 200 }
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
        <Card title="Packages" value={metrics.totalPackages} color="#3b82f6" />
        <Card title="Locations" value={metrics.totalLocations} color="#8b5cf6" />
        <Card title="Bookings" value={metrics.totalBookings} color="#22c55e" />
        <Card title="Revenue" value={`₹${metrics.totalRevenue}`} color="#f59e0b" />
        <Card title="Customized" value={metrics.totalCustomizedPackages} color="#ec4899" />
        <Card title="Hotels" value={metrics.totalHotels} color="#6366f1" />
        <Card title="Transport" value={metrics.totalTransport} color="#f97316" />
        <Card title="Restaurants" value={metrics.totalRestaurants} color="#14b8a6" />
      </div>

     

      {/* Extra Charts */}
      <div style={styles.grid2}>
        <ChartCard title="Service Distribution">
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((e, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartCard>

        <ChartCard title="Monthly Revenue (Static)">
          <BarChart data={staticBarData}>
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
        <Table title="Recent Bookings" data={recentBookings} />
        <Table title="Pending Payments" data={pendingPayments} />
      </div>

    </div>
  );
};

// Reusable Chart Card
const ChartCard = ({ title, children }) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  </div>
);

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

// Table + Status same as before...

const Table = ({ title, data }) => (
  <div style={styles.card}>
    <h3>{title}</h3>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>ID</th><th>Location</th><th>Date</th><th>Passenger</th><th>Amount</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.location_id}</td>
            <td>{row.travel_date}</td>
            <td>{row.passenger}</td>
            <td>₹{row.amount || "-"}</td>
            <td>{row.paymentStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const styles = {
  container: { padding: 20, background: "#f3f4f6", minHeight: "100vh" },
  header: { marginBottom: 20 },
  title: { margin: 0 },
  subtitle: { color: "#666" },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 15 },
  grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 },
  card: { background: "#fff", padding: 15, borderRadius: 12, boxShadow: "0 2px 6px rgba(0,0,0,0.05)" },
  cardBox: { background: "#fff", padding: 15, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" },
  dot: { width: 14, height: 14, borderRadius: "50%" },
  table: { width: "100%", marginTop: 10, borderCollapse: "collapse" }
};

export default Dashboard;