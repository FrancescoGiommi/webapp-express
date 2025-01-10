const express = require("express");
const router = express.Router();
const moviesController = require("../controller/moviesController");

router.get("/", moviesController.Index);

module.exports = router;
