const mongoose = require("mongoose");
require("dotenv").config();

const db_con = process.env.DB_URL;

mongoose
  .connect(db_con)
  .then(() => {
    console.log("MongoDB atlas is connected successfully !!");
  })
  .catch((err) => {
    console.log(err.message);
    return process.exit(1);
  });
