const connection = require("../db/connection");

function index(req, res) {
  const sql = "SELECT * FROM `movies`";
  connection.query(sql, (err, results) => {
    res.json({
      status: "OK",
      movies: results,
    });
  });
}

function show(req, res) {
  connection.query(
    "SELECT * FROM `movies`",
    (err, results) => {
      console.log(results);
    },
    res.json({
      message: "ok",
    })
  );
}

module.exports = { index, show };
