const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const connectionPool = require("../config/db");

// @route     GET api/admin
// @desc      Admin get all rooms details
// @access    Public
router.get("/getallrooms", async (req, res) => {
  const sql = "SELECT * FROM rooms";
  try {
    connectionPool.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/admin
// @desc      Admin get one rooms details by id
// @access    Public
router.get("/getroom/:id", async (req, res) => {
  const sql = "SELECT * FROM rooms WHERE roomId = ?";
  try {
    connectionPool.query(sql, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     POST api/admin
// @desc      Admin add new room type
// @access    Public
router.post(
  "/addroom",
  [
    check("roomType", "Room type is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { roomType, description, image, quantity, price } = req.body;
    const sql = "INSERT INTO rooms values(null, ?, ?, ?, ?, ?)";

    try {
      connectionPool.query(
        sql,
        [description, roomType, image, quantity, price],
        (err, results) => {
          if (err) throw err;
          res.json({
            msg: "Room type created...",
            roomType,
            description,
            image,
            quantity,
            price
          });
        }
      );
    } catch (err) {
      console.error(er.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route     PUT api/admin
// @desc      Admin edit one rooms details by id
// @access    Public
router.put("/updateroom/:id", async (req, res) => {
  const { type, description, image, quantity, price } = req.body;
  const sql =
    "UPDATE rooms SET type = ?, description = ?, image = ?, quantity = ?, price = ? WHERE roomId = ?";

  try {
    connectionPool.query(
      sql,
      [type, description, image, quantity, price, req.params.id],
      (err, results) => {
        if (err) throw err;
        res.json({ msg: "Room updated..." });
      }
    );
  } catch (err) {
    console.error(er.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route     DELETE api/admin
// @desc      Admin delete one room type by id
// @access    Public
router.delete("/deleteroom/:id", async (req, res) => {
  const sql = "DELETE FROM rooms WHERE roomId = ?";
  try {
    connectionPool.query(sql, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({ msg: "Room removed..." });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route     GET api/admin
// @desc      Admin get all reservation info
// @access    Public
router.get("/getallrsv", async (req, res) => {
  const sql =
    "SELECT a.rsvId , b.cusName, c.description , a.roomQty,  DATE_FORMAT(a.dateCheckIn, '%Y-%m-%d') as dateCheckIn, \
    DATE_FORMAT(a.dateCheckOut, '%Y-%m-%d') as dateCheckOut FROM reservation a \
  left JOIN customer b ON a.cusId = b.cusId \
  LEFT JOIN rooms c ON a.roomId = c.roomId";
  try {
    connectionPool.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
