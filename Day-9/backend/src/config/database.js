require("dotenv").config();
const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connnected to Database");
  });
}

module.exports = connectToDB;
