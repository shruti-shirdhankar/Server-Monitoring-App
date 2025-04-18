import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ServerList from './components/ServerList';
import AlertsList from './components/AlertsList';
import Graphs from './components/Graphs';
import './App.css';

function App() {
  return (
    <Container fluid>
      <header>
        <h1 className="header">Server Monitoring Dashboard</h1>
      </header>
      <Row className="mt-4">
        {/* Top Horizontal Graph Cards */}
        <Col md={12}>
          <Row>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Graphs type="cpu" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Graphs type="ram" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Graphs type="disk" />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <Graphs type="app" />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Servers on the left */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>Servers</h4>
              <ServerList />
            </Card.Body>
          </Card>
        </Col>

        {/* Alerts on the right */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4>Alerts</h4>
              <AlertsList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <footer className="header">
      Created by Shruti Shirdhankar | shrutishirdhankar24@gmail.com
      </footer>
      </Container>
  );
}

export default App;
