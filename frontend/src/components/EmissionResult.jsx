import React from "react";

export default function EmissionResult({ results }) {
  if (!results) return null;

  return (
    <div>
      <h2>Emission Results</h2>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {item.name}: {item.value} kg CO₂
          </li>
        ))}
      </ul>
    </div>
  );
}
