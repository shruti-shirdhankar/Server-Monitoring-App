import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';

function Graphs({ type }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    axios.get(`http://127.0.0.1:8000/api/metrics/?type=${type}`)
      .then(response => {
        console.log("Fetched data:", response.data); // Check the structure of the data
        setData(response.data); // Set the data to state
      })
      .catch(error => {
        console.error("Error fetching data:", error); // Error handling
      });
  }, [type]);

  // Prepare chart data based on the fetched data
  const chartData = {
    labels: data.map((_, index) => index), // Use index as x-axis label
    datasets: [
      {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Usage`,
        data: data.map(item => item[`${type}_usage`]), // Get the usage data for the specified type
        fill: false,
        borderColor: '#4bc0c0',
        tension: 0.1,
      }
    ]
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5>{type.charAt(0).toUpperCase() + type.slice(1)} Usage</h5>
      <Line data={chartData} />
    </div>
  );
}

export default Graphs;
