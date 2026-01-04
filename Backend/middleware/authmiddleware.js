const jwt = require("jsonwebtoken");
const User = require("../model/user"); // adjust path if needed

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.Token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, "secret key");

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = auth;
