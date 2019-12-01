const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const connectionPool = require("../config/db");

// @route     POST api/customer
// @desc      Customer login
// @access    Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const getUserByEmail = (email, callback) => {
      connectionPool.query(
        "SELECT email, password FROM customer WHERE email = ?",
        [email],
        (err, results) => {
          if (err) throw err;
          return callback(null, results[0]);
        }
      );
    };

    try {
      getUserByEmail(email, async (err, results) => {
        if (err) throw err;
        if (!results) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, results.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
        res.json({ msg: "Login success..." });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
