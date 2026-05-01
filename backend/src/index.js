require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const { connect } = require('./db');
const usersRouter = require('./routes/users');

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);

app.get('/api', (req, res) => {
  res.json({ message: 'Bandhu backend placeholder' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

connect().then(() => {
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('MongoDB connection error (server will still start):', err);
  app.listen(port, () => {
    console.log(`Backend listening on http://localhost:${port}`);
  });
});
