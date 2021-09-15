// Libraries are arranged alphabetically

const dotenv = require("dotenv");
const express = require("express");
const mongooseConnection = require("./server/database/database");
const passport = require("./server/service/passport");
const router = require("./server/route/auth-route");
const session = require("express-session");
const store = require("connect-mongo").default;

// Config setup
dotenv.config({ path: "config.env" });

let sessionStore = store.create({
  mongoUrl: process.env.MONGO_URI,
  collection: "session",
});

const app = express();

app.use(express.json()); //middleware for body to be in json format

// ########
// session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
  })
);
// for passport to work with session
app.use(passport.initialize());
app.use(passport.session());
// end
// ############

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
