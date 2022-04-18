const { Router } = require("express");

const movieRouter = Router();

const {
  getGenres,
  getGenre,
  getMovie,
  getVideosById,
  getCreditsById,
} = require("../handlers/movieHandlers");

// endpoints for the movie routes
movieRouter.get("/genres", getGenres); // all the genres
movieRouter.get("/genre/:names", getGenre); // movies of the specific genre
movieRouter.get("/:id", getMovie); // movie details
movieRouter.get("/videos/:id", getVideosById); // movie videos
movieRouter.get("/credits/:id", getCreditsById); // movie credits
module.exports = movieRouter;
