const connection = require("../db/connection");

function Index(req, res) {
  res.json({
    message: "ok",
  });
}

module.exports = { Index };
