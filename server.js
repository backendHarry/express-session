// Libraries are arranged alphabetically

const dotenv = require("dotenv");
const express = require("express");
const mongooseConnection = require("./server/database/database");
const router = require("./server/route/auth-route");

// Config setup
dotenv.config({ path: "config.env" });

const app = express();

app.use(express.json());
app.use("/api/V1/auth", router);

// Initial Production Mode
// app.use((req, res, next) => {
//   res.status(500).json({
//     message: "Sorry for the delay, virtual app will be running soon",
//   });
//   next();
// });

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
