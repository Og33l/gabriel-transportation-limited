import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css';

function Dashboard({ token, user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/bookings/user/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(response.data);
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.put(
          `${API_URL}/bookings/${bookingId}/cancel`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchBookings();
      } catch (err) {
        setError('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.full_name}!</h2>
        <p>Email: {user?.email}</p>
      </div>

      <div className="bookings-list">
        <h3>Your Bookings</h3>
        {error && <div className="error">{error}</div>}
        
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>You haven't made any bookings yet. <a href="/">Browse available routes</a></p>
        ) : (
          bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <h4>{booking.departure_city} → {booking.arrival_city}</h4>
              <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
              <p><strong>Passengers:</strong> {booking.number_of_seats}</p>
              <p><strong>Total Price:</strong> GHS {booking.total_price}</p>
              <div className={`booking-status status-${booking.status.toLowerCase()}`}>
                {booking.status.toUpperCase()}
              </div>
              {booking.status === 'confirmed' && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="btn-cancel"
                  style={{
                    marginTop: '10px',
                    backgroundColor: '#dc3545',
                    padding: '8px 15px',
                    fontSize: '12px'
                  }}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;