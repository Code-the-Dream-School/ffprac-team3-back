const { PORT = 8000 } = process.env;
const app = require("./app");
require("dotenv").config();
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')

//connectdb
const connectDB = require("./db/connect");

const listener = async () => {
  try {
    const conn = await connectDB(process.env.MONGO_URI);
    
    let gfs;

    conn.once('open', () => {
      // Initialize GridFS stream
      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('uploads');
    });

    console.log(`Listening on Port ${PORT}!`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

app.listen(PORT, listener);

