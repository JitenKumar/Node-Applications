const express = require("express");
require('./db/mongoose.js')
const app = express();
//const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

app.use(express.json());

app.use('/users',userRouter);
app.use('/tasks',taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});



