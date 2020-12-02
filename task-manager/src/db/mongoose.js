const mongoose = require("mongoose");

mongoose.connect(
  process.env.URL,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
  () => {
    console.log("Connected to DB");
  }
);
