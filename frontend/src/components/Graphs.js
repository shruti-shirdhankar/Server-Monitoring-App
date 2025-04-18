import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';

function Graphs({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/metrics/?type=${type}`)
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, [type]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const formattedLabel = type.charAt(0).toUpperCase() + type.slice(1);

  // Select the appropriate chart component
  const getChartComponent = () => {
    let chartData;

    if (type === 'app') {
      // App Usage – show as Doughnut
      chartData = {
        labels: data.map(item => item.app_name || `App ${item.id}`),
        datasets: [{
          label: 'App Usage',
          data: data.map(item => item.app_usage),
          backgroundColor: ['#4bc0c0', '#36a2eb', '#ffcd56', '#ff6384', '#9966ff'],
        }]
      };
      return <Doughnut data={chartData} />;
    }

    if (type === 'disk') {
      // Disk Usage – show as Bar
      chartData = {
        labels: data.map((_, index) => `Time ${index}`),
        datasets: [{
          label: `${formattedLabel} Usage`,
          data: data.map(item => item.disk_usage),
          backgroundColor: '#ff6384',
        }]
      };
      return <Bar data={chartData} />;
    }

    // CPU / RAM – show as Line
    chartData = {
      labels: data.map((_, index) => index),
      datasets: [{
        label: `${formattedLabel} Usage`,
        data: data.map(item => item[`${type}_usage`]),
        borderColor: ['#36a2eb', '#4bc0c0'],
        tension: 0.3,
      }]
    };
    return <Line data={chartData} />;
  };

  return (
    <div>
      <h5>{formattedLabel} Usage</h5>
      {getChartComponent()}
    </div>
  );
}

export default Graphs;
