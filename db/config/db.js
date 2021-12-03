const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const dbConnection = async () => {
  try {
      const connect = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log(`mongoDB connected -- ${connect.connection.host}`.cyan);
  } catch (err) {
      console.log(`DB ERROR: ${err.message}`.red)
  }
};

module.exports = dbConnection;
