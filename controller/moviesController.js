const connection = require("../db/connection");

/* Index  */
function index(req, res) {
  const sql = "SELECT id,title,director,genre,image FROM `movies`";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      status: "OK",
      movies: results,
    });
  });
}

/* Show  */
function show(req, res) {
  const movieId = req.params.id;
  const showSql =
    "SELECT id,title,director,genre,image FROM `movies` WHERE id = ?";
  connection.query(showSql, [movieId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json({
      message: "ok",
      movie: results[0],
    });
  });
}

module.exports = { index, show };
