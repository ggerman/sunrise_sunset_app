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

const LocationDateForm = () => {

  const {t, i18n} = useTranslation();

  const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
  };

  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    const apiUrl = `http://localhost:5000/api/sunlight/show?location=${encodeURIComponent(location)}&start_date=${startDate}&end_date=${endDate}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to fetch data ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg ring-1 ring-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Search Data
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="start-date" className="block text-gray-700 font-medium mb-2">
            Start Date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label htmlFor="end-date" className="block text-gray-700 font-medium mb-2">
            End Date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-md transition
            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Sunlight Data</h3>
          <table className="sunlight-table min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4 text-left">{t(location)}</th>
                <th className="py-3 px-4 text-left">{t(date)}</th>
                <th className="py-3 px-4 text-left">{t(sunrise)}</th>
                <th className="py-3 px-4 text-left">{t(golden_hour)}</th>
                <th className="py-3 px-4 text-left">{t(sunset)}</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {result.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3 px-4">
                    {item.location.name}, {item.location.country}
                  </td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">
                    {item.sunrise}
                  </td>
                  <td className="py-3 px-4">
                    {item.golden_hour}
                  </td>
                  <td className="py-3 px-4">
                    {item.sunset}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

        {/* Gráfico Recharts */}
        {result && result.length > 0 && (
          <div style={{ height: 300 }}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Sunlight Chart</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={result.map(item => ({
                  name: item.date,
                  sunrise: parseTimeToMinutes(item.sunrise),
                  goldenHour: parseTimeToMinutes(item.golden_hour),
                  sunset: parseTimeToMinutes(item.sunset),
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) =>
                    `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Línea para salida del sol */}
                <Line
                  type="monotone"
                  dataKey="sunrise"
                  name="Sunrise"
                  stroke="#f97316"
                  activeDot={{ r: 6 }}
                  dot={{ r: 4 }}
                />

                {/* Línea para hora dorada */}
                <Line
                  type="monotone"
                  dataKey="goldenHour"
                  name="Golden Hour"
                  stroke="#eab308"
                  activeDot={{ r: 6 }}
                  dot={{ r: 4 }}
                />

                {/* Línea para puesta del sol */}
                <Line
                  type="monotone"
                  dataKey="sunset"
                  name="Sunset"
                  stroke="#3b82f6"
                  activeDot={{ r: 6 }}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>

  );
};

export default LocationDateForm;