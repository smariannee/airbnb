const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { bookingRouter, departmentRouter, personRouter, userRouter, authRouter } = require('../modules/routes')

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(cors({ origins: "*" }));
app.use(express.json({ limit: "50mb" }));

//http://localhost:3000/
app.get("/", (req, res) => {
  res.send("OK");
});

app.use('/api/booking', bookingRouter)
app.use('/api/department', departmentRouter)
app.use('/api/person', personRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

module.exports = {
  app
}