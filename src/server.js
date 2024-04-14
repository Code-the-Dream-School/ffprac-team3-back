require('dotenv').config();
const { PORT = 8000 } = process.env;
const app = require('./app');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const GridFsFiles = require('./models/GridFsFiles.js');

//connectDB
const connectDB = require('./db/connect');



const listener = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    
    let gfs;
    const db = mongoose.connection.db;
    gfs = Grid(db, mongoose.mongo);
    const collection = gfs.collection('uploads');
    
    const files = await collection.find().toArray();
    // console.log(files)

    if (files.length === files.length + 1) {
      files.forEach( async file => {
        GridFsFiles.create({
          filename: file.filename,
          id: file._id,
          contentType: file.contentType,
        });
      });
    }
    
    console.log(`Listening on Port ${PORT}!`);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};


app.listen(PORT, listener);