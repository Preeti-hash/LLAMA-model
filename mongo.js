const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
console.log("URL",DB_URL);
// Create a Mongoose connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const connection = mongoose.connection;

// Listen for connection events
connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Export the connection
module.exports = {connection,mongoose};
