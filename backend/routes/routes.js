const express = require('express');
const { pool } = require('../server');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Get all routes
router.get('/', async (req, res) => {
  try {
    const { departure_city, arrival_city } = req.query;
    let query = 'SELECT * FROM routes WHERE 1=1';
    const params = [];

    if (departure_city) {
      query += ' AND departure_city ILIKE $' + (params.length + 1);
      params.push(`%${departure_city}%`);
    }

    if (arrival_city) {
      query += ' AND arrival_city ILIKE $' + (params.length + 1);
      params.push(`%${arrival_city}%`);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single route
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM routes WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create route (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { departure_city, arrival_city, departure_time, arrival_time, price, available_seats, vehicle_type, description } = req.body;

    if (!departure_city || !arrival_city || !price || !available_seats) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      'INSERT INTO routes (departure_city, arrival_city, departure_time, arrival_time, price, available_seats, vehicle_type, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [departure_city, arrival_city, departure_time, arrival_time, price, available_seats, vehicle_type, description]
    );

    res.status(201).json({ message: 'Route created', route: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;