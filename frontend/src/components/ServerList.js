import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServerList.css'; 

function ServerList() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/servers/')
      .then(response => setServers(response.data))
      .catch(error => console.error('Error fetching servers:', error));
  }, []);

  // Determine the dot color based on server status
  const getStatusColor = (status) => {
    if (status === 'active') {
      return 'green-dot';
    } else if (status === 'down') {
      return 'red-dot';
    } else {
      return 'grey-dot';
    }
  };

  return (
    <div className="server-list">
      <table>
        <thead>
          <tr>
            <th>Server Name</th>
            <th>IP Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {servers.map(server => (
            <tr key={server.id}>
              <td>{server.name}</td>
              <td>{server.ip_add}</td>
              <td>
                <span className={`status-dot ${getStatusColor(server.status)}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerList;
