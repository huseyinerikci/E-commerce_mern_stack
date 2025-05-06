const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(
      "mongodb+srv://andelibtayir:QyUdUaAaJSwyuXaF@cluster0.vdkv2bu.mongodb.net/"
    )
    .then(() => {
      console.log("mongooDB connected");
    })
    .catch((err) => {
      console.log("baglantı hatası", err);
    });
};

module.exports = db;
