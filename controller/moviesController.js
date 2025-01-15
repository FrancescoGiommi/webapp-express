const connection = require("../db/connection");

/* Index  */
function index(req, res) {
  const sql = "SELECT id,title,director,genre,image FROM `movies`";
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    const movie = results.map((movie) => ({
      ...movie,
      image: generateMovieImagePath(movie.image),
    }));
    res.json({
      status: "OK",
      movies: movie,
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
      movie.image = generateMovieImagePath(movie.image);
      res.json({
        status: "OK",
        movie: movie,
      });
    });
  });
}

/* Store  */
function store(req, res) {
  const movieId = req.params.id;
  const { name, vote, text } = req.body;
  const sqlReviews =
    "INSERT INTO reviews (movie_id,name,vote,text) VALUES (?, ?, ?, ?)";

  connection.query(sqlReviews, [movieId, name, vote, text], (err, reviews) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      status: "OK",
      reviews: reviews,
    });
  });
}

const generateMovieImagePath = (nameImage) => {
  const { APP_HOST, APP_PORT } = process.env;
  return `${APP_HOST}:${APP_PORT}/img/movies_cover/${nameImage}`;
};

module.exports = { index, show, store };
