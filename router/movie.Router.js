const express = require("express");
const router = express.Router();
const moviesController = require("../controller/moviesController");

router.get("/", moviesController.index);
router.get("/:id", moviesController.show);

module.exports = router;
