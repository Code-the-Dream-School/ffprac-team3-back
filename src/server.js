const { PORT = 8000 } = process.env;
const app = require("./app");
require("dotenv").config();
//connectdb
const connectDB = require("./db/connect");

const listener = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Listening on Port ${PORT}!`);
};
app.listen(PORT, listener);
