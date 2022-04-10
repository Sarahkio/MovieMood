const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const PORT = 8000;

var app = express();

app.use(express.json());
app.use(morgan("tiny"));
const {
  getGenres,
  getGenre,
  getMovie,
  signUp,
  signIn,
  searchByName,
  getUsers,
  getUser,
  addFriends,
  searchByFriendsUserName,
} = require("./handlers");

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("/movies/genres/", getGenres); // all the genres
app.get("/movies/genre/:names", getGenre); // movies of the specific genre
app.get("/movie/:id", getMovie); // movie details
app.post("/signup", signUp);
app.post("/signin", signIn);
app.get("/users", getUsers); // get users
app.get("/user/:userName", getUser); // get user by id
app.patch("/user/add-friends/:friendsUserName", addFriends); // add friends

app.get("/search/:movie", searchByName); // get/search movie
app.get("/search/user/:friendsUserName", searchByFriendsUserName); // search friend username

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
