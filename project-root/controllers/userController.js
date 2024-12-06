const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (role !== "user" && role !== "admin") {
    return res
      .status(400)
      .json({ message: "keep valid role" });
  }

  try {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) {
          return res.status(500).json({ message: "database error." });
        }
        if (results.length > 0) {
          return res.status(409).json({ message: "Username already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
          [username, hashedPassword, role],
          (err) => {
            if (err) {
              return res.status(500).json({ message: "Registration failed." });
            }
            res.status(201).json({ message: "User successfully registered." });
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({ message: "something went wrong." });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",[username],
    async (err, results) => {
      if (err || results.length === 0) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      const token = jwt.sign(
        { id: user.id,
          role: user.role },
          process.env.JWT_SECRET,
        { expiresIn: "30m" }
      );
      res.status(200).json({ token });
    }
  );
};
