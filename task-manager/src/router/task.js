const express = require("express");
const Task = require("../models/task");
const taskRouter = new express.Router();
const auth = require("../middleware/auth");
// tasks routes
taskRouter.post("/", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

taskRouter.get("/", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

taskRouter.get("/:taskid", auth, async (req, res) => {
  const _id = req.params.taskid;

  try {
    //const tasks = await Task.findById(_id);
    // if tasks is the one created by the user
    const tasks = await Task.findOne({ _id, owner: req.user._id });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.patch("/:taskid", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const alllowedUpdates = ["description", "completed"];
  const isValid = updates.every((update) => alllowedUpdates.includes(update));
  if (!isValid) {
    return res.status(404).send({ error: "Invalid Update" });
  }
  const _id = req.params.taskid;
  try {
    const task = await Task.findOne({
      _id: req.params.taskid,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

taskRouter.delete("/:taskid", auth, async (req, res) => {
  const _id = req.params.taskid;
  try {
    const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = taskRouter;
