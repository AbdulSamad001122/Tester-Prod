import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// --- Health endpoint ---
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Ok' });
});

// Handle non-GET methods to /api/health
app.all('/api/health', (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
