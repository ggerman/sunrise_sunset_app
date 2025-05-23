import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Función para convertir "07:17:03" a minutos del día
const parseTimeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Tooltip personalizado para mostrar horas en formato legible
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 rounded shadow-md">
        <strong>{label}</strong>
        <br />
        {payload.map((entry, index) => {
          const value = entry.value;
          const hours = Math.floor(value / 60);
          const mins = value % 60;
          const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
          return (
            <div key={index}>
              <span style={{ color: entry.color }}>
                {entry.name}: {timeStr}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};