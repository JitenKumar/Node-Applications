const mongoose = require("mongoose");
const Task = require("./models/task");

Task.findByIdAndDelete("5ee2367ab83a8a24482e9877").then((task)=>{
    console.log(task);
    return Task.countDocuments({complete:false})

}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
})