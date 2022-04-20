"use strict";
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
const axios = require("axios");
const { MOVIE_API } = process.env;
const { genres } = require("./data.js");
// console.log(genres);
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "./.env" });
const { MONGO_URI } = process.env;
const ObjectId = require("mongodb").ObjectId;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const searchByName = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const movie = req.params.movie;
  const page = req.query.page || 1;

  try {
    await client.connect();
    const db = client.db("movies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&query=${movie}&page=${page}`
    );
    if (response) {
      res.status(200).json({ status: 200, data: response.data.results });
    } else {
      res.status(400).json({ status: 400, message: "movie details not found" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const searchByFriendsUserName = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    // console.log("starting connection");
    await client.connect();
    const db = client.db("movies");
    const query = {
      friendsUserName: req.params.userName,
    };
    const friendsUsername = await db.collection("users").findOne(query);
    if (friendsUsername) {
      res.status(200).json({ status: 200, data: friendsUsername });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "friend username not founds" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movies");
    const users = await db.collection("users").find().toArray();
    if (users) {
      res.status(200).json({ status: 200, data: users });
    } else {
      res.status(400).json({ status: 400, message: "err getting users" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.params.userName,
    };
    const username = await db.collection("users").findOne(query);
    if (username) {
      res.status(200).json({ status: 200, data: username });
    } else {
      res.status(400).json({ status: 400, message: "err getting username" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const addFriends = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { friendsUserName } = req.params;

  try {
    await client.connect();
    const db = client.db("movies");

    const query = {
      userName: req.body.userName,
    };

    const user = await db.collection("users").findOne(query);

    const update = {
      $push: {
        friends: friendsUserName,
      },
    };

    if (user.friends.includes(friendsUserName)) {
      res.status(400).json({ status: 400, message: "friend already added" });
    } else {
      const updateMyFriends = await db
        .collection("users")
        .findOneAndUpdate(query, update, { returnDocument: "after" });
      res.status(200).json({ status: 200, data: updateMyFriends.value });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const removeFriends = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.body.userName,
    };
    const friend = await db.collection("users").findOne(query);

    const update = {
      $pull: {
        friends: req.params.friendsUserName,
      },
    };
    const removeFriend = await db
      .collection("users")
      .findOneAndUpdate(query, update, { returnDocument: "after" });
    if (removeFriend) {
      res.status(200).json({ status: 200, data: removeFriend.value });
    } else {
      res.status(400).json({
        status: 400,
        message: "no friends to remove",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Unknown error" });
  } finally {
    client.close();
  }
};

const postComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = uuidv4();
  const db = client.db("movies");

  try {
    await client.connect();
    // comments mongodb
    let body = {
      _id: _id, // comment id that we created
      userName: req.body.userName,
      comments: req.body.comments,
      movietitle: req.body.title,
      movieid: req.body.id,
      numOfLikes: 0,
      numOfDislikes: 0,
      numOfRatings: req.body.ratings,
      timeOfComments: new Date(),
      posterPath: req.body.poster,
    };

    let comments = await db.collection("comments").insertOne(body);

    const query = {
      userName: req.body.userName,
    };

    const update = {
      $push: {
        comments: _id,
      },
    };

    const updateComments = await db
      .collection("users")
      .updateOne(query, update);

    if (updateComments) {
      res.status(200).json({
        status: 200,
        data: updateComments,
        comments,
      });
    } else {
      res.status(400).json({ status: 400, message: "err getting comments" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const addLikes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.body._id;
  const liked = req.body.like; // true or false
  const disliked = req.body.dislike;
  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.body.userName,
    };
    const user = await db.collection("users").findOne(query);

    if (!liked) {
      if (disliked) {
        const postDislikes = await db
          .collection("comments")
          .updateOne(
            { _id: _id },
            { $inc: { numOfDislikes: -1, numOfLikes: +1 } }
          );
      } else {
        const postLikes = await db
          .collection("comments")
          .updateOne({ _id: _id }, { $inc: { numOfLikes: +1 } });
      }
      const userLiked = await db.collection("users").updateOne(query, {
        $push: { commentsLiked: _id },
        $pull: { commentsDisliked: _id },
      });
      return res.status(200).json({ status: 200, message: "success" });
    } else {
      const postRemoveLikes = await db
        .collection("comments")
        .updateOne({ _id: _id }, { $inc: { numOfLikes: -1 } });
      const postUsersRemoveLikes = await db
        .collection("users")
        .updateOne(query, { $pull: { commentsLiked: _id } });
      return res.status(200).json({ status: 200, message: "success" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const addDislikes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.body._id;
  const liked = req.body.like; // true or false
  const disliked = req.body.dislike;

  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.body.userName,
    };

    const user = await db.collection("users").findOne(query);

    if (!disliked) {
      if (liked) {
        const postLikes = await db
          .collection("comments")
          .updateOne(
            { _id: _id },
            { $inc: { numOfDislikes: +1, numOfLikes: -1 } }
          );
      } else {
        const postDislikes = await db
          .collection("comments")
          .updateOne({ _id: _id }, { $inc: { numOfDislikes: +1 } });
      }
      const userDisliked = await db.collection("users").updateOne(query, {
        $push: { commentsDisliked: _id },
        $pull: { commentsLiked: _id },
      });
      res.status(200).json({ status: 200, message: "success" });
    } else {
      const postRemoveDisLikes = await db
        .collection("comments")
        .updateOne({ _id: _id }, { $inc: { numOfDislikes: -1 } });
      const postUsersRemoveLikes = await db
        .collection("users")
        .updateOne(query, { $pull: { commentsDisliked: _id } });
      res.status(200).json({ status: 200, message: "success" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};
// delete comment in comment collection but not in users collection
const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userName } = req.params;
  const { _id } = req.body;
  try {
    await client.connect();
    const db = client.db("movies");
    await db.collection("comments").deleteOne({ _id: _id });
    await db
      .collection("users")
      .updateOne({ userName: userName }, { $pull: { comments: _id } });

    const users = await db
      .collection("users")
      .updateMany({}, { $pull: { commentsLiked: _id, commentsDisliked: _id } });

    res.status(200).json({ status: 200, message: "successfully deleted" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

const getCommentByUserName = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.params.userName,
    };

    const users = await db.collection("users").findOne(query);

    const comments = await db
      .collection("comments")
      .find({ _id: { $in: users.comments } })
      .toArray();

    if (comments) {
      res.status(200).json({ status: 200, data: comments });
    } else {
      res.status(400).json({ status: 400, message: "no comments" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const getCommentByMovieId = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      movieid: req.params.movieid,
    };

    const comments = await db.collection("comments").find(query).toArray();

    if (comments) {
      res.status(200).json({ status: 200, data: comments });
    } else {
      res.status(400).json({ status: 400, message: "err getting comments" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

module.exports = {
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
};
