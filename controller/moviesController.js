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
  const sqlMovie =
    "SELECT id,title,director,genre,release_year,abstract,image FROM `movies` WHERE id = ?";

  connection.query(sqlMovie, [movieId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    const [movie] = results;
    const sqlReviews =
      "SELECT id,name,vote,text FROM reviews WHERE movie_id = ?";
    connection.query(sqlReviews, [movieId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query failed" });
      }

      movie.reviews = results;
      res.json({
        status: "OK",
        movie,
      });
    });
  });
}

module.exports = { index, show };
