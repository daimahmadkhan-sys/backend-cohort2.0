const app = require("./src/app");
require("dotenv").config();
const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
  });
}

connectToDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
