const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const common = require("../common");
const User = require("../models/user");
const router = express.Router();

const secret = common.secret;


router.post('/checkToken', common.verifyToken, async (req, res) => { 
    res.status(200).send({message:"authorization sucsess",sucsess:true});
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(`${password}`, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({
        _id: user._id,
        username: user.username,
    }, secret);
      
    res.json({
      message: "Login successful",
      user: {
        token: token,
        id:user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

router.post("/", async (req, res) => {
  const { username, password, email, fullName } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = new User({
      username,
      password,
      email,
      fullName,
    });
    await newUser.save();

    const token = jwt.sign({
      _id: newUser._id,
      username: newUser.username,
    }, secret);

    res.status(201).json({ message: "User registered successfully" ,token: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id,
    });

    res.status(200);
    res.send(await User.find()); // bad for preformanse
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({
    _id: id,
  });

  if (user) {
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.phone = req.body.phone;
  }

  try {
    await user.save();
    res.send(user);
    res.end();
  } catch (error) {
    res.status(500);
    res.send(error);
    res.end();
  }
});

module.exports = router;
