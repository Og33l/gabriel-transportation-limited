const express = require('express');
const { pool } = require('../server');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', verifyToken, async (req, res) => {
  try {
    const { route_id, number_of_seats, total_price } = req.body;
    const user_id = req.userId;

    if (!route_id || !number_of_seats || !total_price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check available seats
    const route = await pool.query('SELECT available_seats FROM routes WHERE id = $1', [route_id]);
    if (route.rows.length === 0) {
      return res.status(404).json({ error: 'Route not found' });
    }

    if (route.rows[0].available_seats < number_of_seats) {
      return res.status(400).json({ error: 'Not enough available seats' });
    }

    // Create booking
    const result = await pool.query(
      'INSERT INTO bookings (user_id, route_id, number_of_seats, total_price, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, route_id, number_of_seats, total_price, 'confirmed']
    );

    // Update available seats
    await pool.query(
      'UPDATE routes SET available_seats = available_seats - $1 WHERE id = $2',
      [number_of_seats, route_id]
    );

    res.status(201).json({ message: 'Booking created', booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user bookings
router.get('/user/:user_id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT b.*, r.departure_city, r.arrival_city, r.departure_time, r.price FROM bookings b JOIN routes r ON b.route_id = r.id WHERE b.user_id = $1',
      [req.params.user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *',
      ['cancelled', req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled', booking: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;