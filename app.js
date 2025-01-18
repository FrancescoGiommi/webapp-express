//! Esercizio

/* Utilizzando il file in allegato, creiamo un database con MySQL Workbench
    Creiamo una nuova applicazione Express
    Colleghiamo l’app al db e verifichiamo che tutto funzioni
    Prepariamo una rotta index per ottenere la lista dei film
    Prepariamo una rotta show per ottenere i dettagli di un singolo film e le sue recensioni

Bonus

    Inserire delle immagini nel progetto express e dunque nel db
    Inserire i dati di connessione al database come variabili d’ambiente
    Inserire le vostre API in controller
    Inserire le vostre rotte in un router
    Inserire un middleware per le rotte inesistenti
    Inserire un middleware per la gestione errori */

/* Express init */
const express = require("express");
const cors = require("cors");
const app = express();

const { APP_HOST, APP_PORT, APP_FRONTEND_URL } = process.env;

/* Cors config */
var corsOptions = {
  origin: APP_FRONTEND_URL,
  optionsSuccessStatus: 200,
};

/* Body parser per decifrare il request body */
app.use(express.json());

/* Middlewares */
app.use(express.static("public"));
app.use(cors(corsOptions));

/* Routes */
const moviesRouter = require("./router/movie.Router");
app.use("/api/movies", moviesRouter);

/* Error handler and notFound */
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");

app.use(errorsHandler);
app.use(notFound);

/* Server listening */
app.listen(APP_PORT, () => {
  console.log(`App listening at ${APP_HOST}:${APP_PORT}`);
});
