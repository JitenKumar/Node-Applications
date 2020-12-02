const express = require("express");
const User = require("../models/user");
const userRouter = new express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
const {sendWelcomeEmail,sendCancelEmail } = require('../emails/account');
userRouter.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email,user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.get("/me", auth, async (req, res) => {
  res.send(req.user);
});

userRouter.patch("/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const alllowedUpdates = ["name", "email", "age", "password"];
  const isValid = updates.every((update) => alllowedUpdates.includes(update));
  if (!isValid) {
    return res.status(404).send({ error: "Invalid Uodate" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.delete("/me", auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id);
    // if (!user) {
    //   return res.status(404).send();
    // }
    
    await req.user.remove();
    sendCancelEmail(req.user.email,req.user.name);
    
    res.send(req.user);
  } catch (error) {
    res.status(400).send();
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    // console.log(user);
    const token = await user.generateAuthToken();
    //console.log(token)
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

userRouter.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
    // cb(new Error('File Must be a pdf'));
    // cb(undefined,true);
    // cb(undefined,false);
  },
});
userRouter.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error });
  }
);

userRouter.delete(
  "/me/avatar",
  auth,
  async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error });
  }
);

userRouter.get("/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});
// adding file upload using multer
module.exports = userRouter;
