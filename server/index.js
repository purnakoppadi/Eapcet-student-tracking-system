require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;
let server;

async function startServer() {
  await connectDB();
  server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

async function shutdown(signal) {
  console.log(`${signal} received. Closing server.`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.connection.close();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer().catch((error) => {
  console.error('Unable to start server:', error.message);
  process.exit(1);
});
