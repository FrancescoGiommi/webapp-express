const connection = require("../db/connection");

/**
 * Funzione che mostra tutti i film
 */
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

/**
 * Funzione che mostra il dettaglio di un film
 */
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

    if (!movie) {
      return res.status(404).json({
        status: "KO",
        message: "Movie Not Found",
      });
    }
    movie.image = generateMovieImagePath(movie.image);
    const sqlReviews =
      "SELECT id,name,vote,text FROM reviews WHERE movie_id = ? ORDER BY created_at DESC";
    connection.query(sqlReviews, [movieId], (err, reviews) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database query failed" });
      }

      movie.reviews = reviews;

      res.json({
        status: "OK",
        movie: movie,
      });
    });
  });
}

/**
 *  Funzione che aggiunge una recensione al film
 */
function storeReview(req, res) {
  const movieId = req.params.id;
  console.log(req.body);
  const { name, vote, text } = req.body;

  let hasErrors = false;
  if (!name) hasErrors = true;
  if (!text) hasErrors = true;
  if (isNaN(parseInt(vote)) || vote < 1 || vote > 5) hasErrors = true;

  if (hasErrors) {
    return res.status(403).json({
      status: "KO",
      message: "Invalid data",
    });
  }

  const sqlReviews =
    "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)";

  connection.query(sqlReviews, [movieId, name, vote, text], (err) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      status: "OK",
      reviews: "Review Added",
    });
  });
}

/**
 *  Funzione che mostra la lista delle recensioni
 */
function getReview(req, res) {
  const movieId = req.params.id;
  const sql =
    "SELECT id,name,vote,text FROM reviews WHERE movie_id = ? ORDER BY created_at DESC";
  connection.query(sql, [movieId], (err, reviews) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      status: "OK",
      reviews,
    });
  });
}

/**
 * Funzione che genera il path dell'immagine
 * @param {nome_immagine} nameImage
 */
const generateMovieImagePath = (nameImage) => {
  const { APP_HOST, APP_PORT } = process.env;
  return `${APP_HOST}:${APP_PORT}/img/movies_cover/${nameImage}`;
};

module.exports = { index, show, storeReview, getReview };
