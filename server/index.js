const express = require("express");
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();
const PORT = 8000;

var app = express();

app.use(express.json());
app.use(morgan("tiny"));
const {
  searchByName,
  getUsers,
  getUser,
  addFriends,
  searchByFriendsUserName,
  removeFriends,
  postComments,
  getCommentByUserName,
  getCommentByMovieId,
  addLikes,
  addDislikes,
  deleteComment,
} = require("./handlers");

const movieRouter = require("./routes/movieRoutes");
const loginRouter = require("./routes/loginRoutes");

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/movies", movieRouter); // all movie endpoints
// move this to router to login
app.use("/login", loginRouter); // all login endpoints

// router for user data
app.get("/users", getUsers); // get users
app.get("/user/:userName", getUser); // get user by id
app.patch("/user/add-friends/:friendsUserName", addFriends); // add friends to friends array
app.patch("/user/remove-friends/:friendsUserName", removeFriends); // remove friends froom frriends array
//router for comments
app.post("/comments", postComments); // post comments
app.get("/user-comment/:userName", getCommentByUserName); // get specific comment by uusername (profile)
app.get("/movie-comment/:movieid", getCommentByMovieId); // get specific comment by movieId   (moviedetails)
app.patch("/like-comment/:userName", addLikes);
app.patch("/dislike-comment/:userName", addDislikes);
app.delete("/delete-comment/:userName", deleteComment);
// delete comments

//routerr for search
app.get("/search/:movie", searchByName); // get/search movie
app.get("/search/user/:friendsUserName", searchByFriendsUserName); // search friend username

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
