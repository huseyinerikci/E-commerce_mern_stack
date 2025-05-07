const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("mongooDB connected");
    })
    .catch((err) => {
      console.log("baglantı hatası", err);
    });
};

module.exports = db;
