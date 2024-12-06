const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  // console.log(req.headers);
  const token = req.headers.authorization? req.headers.authorization.split(" ")[1]: null;
  // console.log(token);
  if (!token) return res.status(401).json({ message: "unauthorized access" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "token verification failed" });
    // console.log(decoded);
    req.user = decoded;

    next();
  });
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "admin access required" });
  next();
};

exports.validateAdminApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: "invalid API key" });
  }
  next();
};
