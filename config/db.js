var mysql = require("mysql");

var connectionPool = mysql.createPool({
  host: "localhost",
  database: "hotelbooksys",
  user: "root",
  password: "",
  multipleStatements: true
});

module.exports = connectionPool;
