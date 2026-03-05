const express = require("express");
const userModel = require("../models/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = crypto.createHash("md5").update(password).digest("hex");

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      massege: "User is already exist with this email",
    });
  }

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" },
  );
  res.cookie("jwt_token", token);

  res.status(201).json({
    massege: "User registered succesfully",
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.jwt_token;

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decode.id);

  res.status(200).json({
    user: user.name,
    email: user.email,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      massege: "user not found with this email",
    });
  }

  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(401).json({
      massege: "invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" },
  );

  res.cookie("jwt_token", token);
  res.status(200).json({
    massege: "login successfull",
  });
});

module.exports = authRouter;
