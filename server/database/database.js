const mongoose = require("mongoose");

const connect = async (cb) => {
  try {
    const options = {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const connection = await mongoose.connect(process.env.MONGO_URI, options);
    if (connection) {
      console.log(`Database is running at ${connection.connection.host}`);
      cb();
      return connection;
    } else {
      console.log("Database not connected");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
