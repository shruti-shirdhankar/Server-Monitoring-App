import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlertsList.css'; // Import the CSS file for styling

function AlertsList() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/alerts/')
      .then(response => setAlerts(response.data))
      .catch(error => console.error('Error fetching alerts:', error));
  }, []);

  // Determine the background color based on alert type
  const getAlertColor = (alertType) => {
    switch (alertType) {
      case 'critical':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'grey'; // Default color
    }
  };

  return (
    <div>
      <ul>
        {alerts.map(alert => (
          <li key={alert.id} className={`alert-item ${getAlertColor(alert.alert_type)}`}>
            <div className="alert-header">
              <strong>{alert.alert_type.toUpperCase()}</strong> - {alert.timestamp}
            </div>
            <div className="server-id">Server ID: {alert.server}</div> 
            <div className="alert-note">
              {alert.note}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlertsList;
