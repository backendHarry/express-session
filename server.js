// Libraries are arranged alphabetically

const dotenv = require("dotenv");
const express = require("express");
const mongooseConnection = require("./server/database/database");

// Config setup
dotenv.config({ path: "config.env" });

const app = express();
// Initial Production Mode
app.use((req, res, next) => {
  res.status(500).json({
    message: "Sorry for the delay, virtual app will be running soon",
  });
  next();
});

// For errors
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Sorry, the problem is from us, please co-operate with us!",
  });
  next();
});

mongooseConnection(() => {
  app.listen(5000, () =>
    console.log(`server is running at PORT ${process.env.PORT}`)
  );
});
