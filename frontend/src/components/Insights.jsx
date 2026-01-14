import React from "react";

export default function Insights({ results }) {
  if (!results) return null;

  const totalEmission = results.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <h2>Insights</h2>
      <p>Total Carbon Emission: {totalEmission} kg CO₂</p>
      {totalEmission > 50 && <p>Try to reduce your carbon footprint!</p>}
    </div>
  );
}
