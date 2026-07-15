import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css';

function Home({ token }) {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/routes`);
      setRoutes(response.data);
      setFilteredRoutes(response.data);
    } catch (err) {
      setError('Failed to fetch routes');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = routes.filter(route =>
      (departure === '' || route.departure_city.toLowerCase().includes(departure.toLowerCase())) &&
      (arrival === '' || route.arrival_city.toLowerCase().includes(arrival.toLowerCase()))
    );
    setFilteredRoutes(filtered);
  };

  const handleBook = (routeId) => {
    if (!token) {
      alert('Please login to book a trip');
      return;
    }
    alert(`Booking for route ${routeId}. Full booking feature coming soon!`);
  };

  return (
    <div className="home-container">
      <div className="search-section">
        <h2>Book Your Journey</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Departure City"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <input
            type="text"
            placeholder="Arrival City"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="routes-list">
        <h3>Available Routes</h3>
        {loading ? (
          <p>Loading routes...</p>
        ) : filteredRoutes.length === 0 ? (
          <p>No routes found</p>
        ) : (
          filteredRoutes.map(route => (
            <div key={route.id} className="route-card">
              <div className="route-details">
                <h4>{route.departure_city} → {route.arrival_city}</h4>
                <p><strong>Departure:</strong> {route.departure_time}</p>
                <p><strong>Arrival:</strong> {route.arrival_time}</p>
                <p><strong>Vehicle:</strong> {route.vehicle_type}</p>
                <p><strong>Available Seats:</strong> {route.available_seats}</p>
                <p className="route-description">{route.description}</p>
              </div>
              <div className="route-footer">
                <span className="price">GHS {route.price}</span>
                <button onClick={() => handleBook(route.id)} className="btn-book">
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;