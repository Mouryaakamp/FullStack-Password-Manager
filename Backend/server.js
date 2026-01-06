const express = require("express");
const app = express();
require("./model/dbmodel.js");
const Password = require("./model/dbmodel.js");
const User = require("./model/user.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/authmiddleware.js");
const jwt_key = process.env.JWT_TOKEN;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "https://online-and-offline-fullstack-password.onrender.com",
  credentials: true
}));



app.get("/", (req, res) => {
  res.send("Backend running");
});


app.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email }, jwt_key, { expiresIn: "1d" }
    );

    res.cookie("Token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(201).json({ message: "User created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sign-in failed" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email }, jwt_key, { expiresIn: "1d" }
    );

    res.cookie("Token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});


app.get("/log-out", (req, res) => {
  res.clearCookie("Token");
  res.json({ message: "Logged out" });

});


app.get("/passwords", auth, async (req, res) => {
  const passwords = await Password.find({ user: req.user._id });
  res.json(passwords);
});


app.post("/save", auth, async (req, res) => {
  const newPassword = await Password.create({
    ...req.body,
    user: req.user._id,
  });

  res.json(newPassword);
});


app.put("/edit/:id", auth, async (req, res) => {
  try {
    const updated = await Password.findOneAndUpdate(
      { id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});


app.delete("/delete/:id", auth, async (req, res) => {
  try {
    const deleted = await Password.findOneAndDelete({
      id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
