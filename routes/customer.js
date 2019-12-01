const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const connectionPool = require("../config/db");

// @route     GET api/customer
// @desc      Get avaiable rooms on range date
// @access    Public
router.get("/getavailrooms", async (req, res) => {
  const { checkIn, checkOut } = req.body;
  const sql =
    "SELECT DATE_FORMAT(x.cal_date, '%Y-%m-%d') date \
    , z.description, ifnull(z.quantity - SUM(y.roomQty), z.quantity) available \
    FROM calendar_table x \
    LEFT JOIN reservation y ON x.cal_date >= y.dateCheckIn AND x.cal_date < y.dateCheckOut \
    RIGHT JOIN rooms z ON z.roomId = y.roomId or y.roomId is null \
    WHERE x.cal_date between DATE_FORMAT(?, '%Y-%m-%d') AND DATE_FORMAT(?, '%Y-%m-%d') \
    GROUP BY x.cal_date, z.roomId;";
  try {
    connectionPool.query(sql, [checkIn, checkOut], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/customer
// @desc      Get reservation details by id
// @access    Public
router.get("/rsv/:id", async (req, res) => {
  const sql =
    "SELECT rsvId, cusId, roomId, \
  DATE_FORMAT(dateCheckIn, '%Y-%m-%d') as dateCheckIn, \
  DATE_FORMAT(dateCheckOut, '%Y-%m-%d') as dateCheckOut \
  FROM reservation WHERE rsvId = ?";
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

// @route     POST api/customer
// @desc      Create room reservation
// @access    Public
router.post(
  "/addrsv",
  [
    check("roomId", "Room type is required")
      .not()
      .isEmpty(),
    check("dateCheckIn", "Date check in is required")
      .not()
      .isEmpty(),
    check("dateCheckOut", "Date check out is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { cusId, roomId, dateCheckIn, dateCheckOut, roomQty } = req.body;
    const sql = "INSERT INTO reservation values(null, ?, ?, ?, ?, ?)";

    try {
      connectionPool.query(
        sql,
        [cusId, roomId, dateCheckIn, dateCheckOut, roomQty],
        err => {
          if (err) throw err;
          res.json({
            msg: "Reservation created...",
            cusId,
            roomId,
            dateCheckIn,
            dateCheckOut,
            roomQty
          });
        }
      );
    } catch (err) {
      console.error(er.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route     DELETE api/customer
// @desc      Delete reservation by id
// @access    Public
router.delete("/deletersv/:id", async (req, res) => {
  const sql = "DELETE FROM reservation WHERE rsvId = ?";
  try {
    connectionPool.query(sql, [req.params.id], (err, results) => {
      if (err) throw err;
      res.json({
        msg: `Reservation Id:${req.params.id} has been cancelled...`
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
