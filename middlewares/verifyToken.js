const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }
  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};