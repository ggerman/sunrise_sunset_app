// src/components/SunriseChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const SunriseChart = ({ result }) => {
  if (!result || result.length === 0) return <p>No data available</p>;

  // Función para convertir hora a HH:mm
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Preparar datos para Recharts
  const chartData = result.map((item, index) => ({
    name: item.date,
    [`Sunrise - ${item.location.name}, ${item.location.country}`]: formatTime(item.sunrise)
  }));

  // Obtener claves dinámicas (una por ubicación)
  const keys = [...new Set(result.map(item => `Sunrise - ${item.location.name}, ${item.location.country}`))];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {keys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={i === 0 ? '#3b82f6' : '#10b981'}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SunriseChart;