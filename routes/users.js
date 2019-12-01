const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator/check");
const connectionPool = require("../config/db");

// @route     POST api/customer
// @desc      Customer user registration
// @access    Public
router.post(
  "/register",
  [
    check("cusName", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cusName, email } = req.body;

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
        if (results) {
          return res.status(400).json({ msg: "Email already exist..." });
        }
        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(req.body.password, salt);

        const sql = "INSERT INTO customer values(null, ?, ?, ?)";
        connectionPool.query(sql, [cusName, email, password], err => {
          if (err) throw err;
          res.json({
            msg: "User created...",
            cusName,
            email
          });
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
