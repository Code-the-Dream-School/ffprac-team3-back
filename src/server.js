require('dotenv').config();
const { PORT = 8000 } = process.env;
const app = require('./app');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

//connectDB
const connectDB = require('./db/connect');

const listener = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    let gfs;
    const db = mongoose.connection.db;
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('uploads');

    console.log(`Listening on Port ${PORT}!`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

app.listen(PORT, listener);
