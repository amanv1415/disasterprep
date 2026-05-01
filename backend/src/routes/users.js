const express = require('express');
const router = express.Router();
const { getDb } = require('../db');

router.post('/', async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: 'Database not connected' });

    const user = req.body;
    if (!user || !user.email) return res.status(400).json({ error: 'Missing user data (email required)' });

    user.createdAt = new Date();
    const result = await db.collection('users').insertOne(user);
    return res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    console.error('Error inserting user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const db = getDb();
    if (!db) return res.status(503).json({ error: 'Database not connected' });

    const { email } = req.query;
    const filter = email ? { email } : {};
    const users = await db.collection('users').find(filter).toArray();
    return res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
