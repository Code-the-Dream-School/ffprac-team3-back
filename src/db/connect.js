const mongoose = require("mongoose");

const connectDB = async(url) => {
  const conn = await mongoose.createConnection(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  });

  return conn;
};

module.exports = connectDB;
