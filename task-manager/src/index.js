const express = require("express");
require('./db/mongoose.js')
const app = express();
const port = process.env.PORT;
const userRouter = require("./router/user");
const taskRouter = require("./router/task");
app.use(express.json());
app.use('/users',userRouter);
app.use('/tasks',taskRouter);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});



