require('dotenv').config()
const express = require("express");
const app = express();
const mangoose = require("mongoose");

mangoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mangoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("DB connected"));

app.use(express.json())

const subscriberRoute = require('./routes/subscibers');
app.use('/subscribers', subscriberRoute)

app.listen(3000, () => {
  console.log("connected");
});
