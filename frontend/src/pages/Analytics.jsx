import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { fetchAnalytics } from "../services/api";

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [view, setView] = useState("weekly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics()
      .then(data => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading analytics...</p>;
  if (!analytics) return <p>No data available</p>;

  // Select correct dataset
  const dataMap = {
    daily: analytics.daily,
    weekly: analytics.weekly,
    monthly: analytics.monthly
  };

  const chartData = dataMap[view] || [];

  // Calculate total for selected view
  const totalForView = chartData.reduce(
    (sum, item) => sum + item.co2,
    0
  );

  // X-axis key
  const xKey =
    view === "daily" ? "date" :
    view === "weekly" ? "week" :
    "month";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌍 Carbon Analytics</h1>

      {/* TOTAL */}
      <div style={styles.card}>
        <h2>
          {view === "daily" && "Daily Total"}
          {view === "weekly" && "Weekly Total"}
          {view === "monthly" && "Monthly Total"}
        </h2>
        <p style={styles.total}>
          {totalForView.toFixed(1)} kg CO₂
        </p>
      </div>

      {/* TOGGLE */}
      <div style={styles.toggle}>
        {["daily", "weekly", "monthly"].map(type => (
          <button
            key={type}
            onClick={() => setView(type)}
            style={{
              ...styles.button,
              backgroundColor: view === type ? "#2ecc71" : "#eee"
            }}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CHART */}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={320}>

          {/* DAILY → LINE */}
          {view === "daily" && (
            <LineChart data={chartData}>
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip formatter={(v) => `${v} kg CO₂`} />
              <CartesianGrid stroke="#ddd" />
              <Line
                type="monotone"
                dataKey="co2"
                stroke="#2ecc71"
                strokeWidth={2}
              />
            </LineChart>
          )}

          {/* WEEKLY → BAR */}
          {view === "weekly" && (
            <BarChart data={chartData}>
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip formatter={(v) => `${v} kg CO₂`} />
              <CartesianGrid stroke="#ddd" />
              <Bar dataKey="co2" fill="#2ecc71" />
            </BarChart>
          )}

          {/* MONTHLY → AREA */}
          {view === "monthly" && (
            <AreaChart data={chartData}>
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip formatter={(v) => `${v} kg CO₂`} />
              <CartesianGrid stroke="#ddd" />
              <Area
                type="monotone"
                dataKey="co2"
                stroke="#2ecc71"
                fill="#2ecc71"
                fillOpacity={0.3}
              />
            </AreaChart>
          )}

        </ResponsiveContainer>
      </div>

      {/* INSIGHT */}
      <div style={styles.card}>
        <h3>💡 Insight</h3>
        <p>
          Emissions are highest during periods with frequent animal-based
          purchases. Shifting even a few meals to plant-based alternatives
          can significantly reduce your carbon footprint.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "2rem",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem"
  },
  card: {
    padding: "1.5rem",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    marginBottom: "1.5rem",
    textAlign: "center"
  },
  total: {
    fontSize: "2rem",
    color: "#2ecc71"
  },
  toggle: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1rem"
  },
  button: {
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  chartContainer: {
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "1.5rem"
  }
};
