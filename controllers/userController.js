import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* ================= REGISTER ================= */

export function registerUser(req, res) {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, 10);

  const newUser = new User(data);

  newUser
    .save()
    .then(() => {
      res.json({ message: "User registered successfully" });
    })
    .catch(() => {
      res.status(500).json({ error: "User register failed" });
    });
}

/* ================= LOGIN ================= */

export function loginUser(req, res) {
  const data = req.body;

  User.findOne({ email: data.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Login failed" });
    }

    // JWT
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    // ⭐ FIX: send user object
    res.json({
      message: "login successful",
      token: token,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        phone: user.phone,
      },
    });
  });
}

/* ================= ROLE CHECKERS ================= */

export function isItAdmin(req) {
  let isAdmin = false;

  if (req.user && req.user.role === "admin") {
    isAdmin = true;
  }

  return isAdmin;
}

export function isItCustomer(req) {
  let isCustomer = false;

  if (req.user && req.user.role === "customer") {
    isCustomer = true;
  }

  return isCustomer;
}
