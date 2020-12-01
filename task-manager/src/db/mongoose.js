const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017/task-manager-api";
mongoose.connect(
  URL,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
  () => {
    console.log("Connected to DB");
  }
);
