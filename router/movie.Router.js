const express = require("express");
const router = express.Router();
const moviesController = require("../controller/moviesController");

router.get("/", moviesController.index);
router.get("/:id", moviesController.show);
router.post("/:id/reviews", moviesController.storeReview);
router.get("/:id/reviews", moviesController.getReview);

module.exports = router;
