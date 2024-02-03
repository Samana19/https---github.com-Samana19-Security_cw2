const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/bookcommunity")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};
module.exports = connectDB;
