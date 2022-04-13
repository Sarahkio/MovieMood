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

const signUp = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = uuidv4();
  const db = client.db("movies");
  //   const password = req.body.password;
  //   const confirmPassword = req.body.confirmPassword;

  let body = {
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    // userName: req.body.userName,
    userName: req.body.userName,
    email: req.body.email,
    friends: [],
    comments: [],
    // postLikes: 0,
    // postDisLikes: 0,
    commentsLiked: [],
    commentsDisliked: [],
    // password: req.body.password,
  };

  //   console.log("this is hashpassowrd", hashPassword);
  try {
    await client.connect();
    const query = { email: req.body.email };
    const queryUserName = { userName: req.body.userName };
    const user = await db
      .collection("users")
      .findOne({ $or: [query, queryUserName] });
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(req.body.password, salt);
    if (user) {
      res.status(400).json({ status: 400, message: "users found" });
    } else {
      let users = await db
        .collection("users")
        .insertOne({ ...body, password: hashPassword });
      res.status(200).json({ status: 200, users, data: body });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const signIn = async (req, res) => {
  //bycrypt.coommparre
  const client = new MongoClient(MONGO_URI, options);
  const _id = uuidv4();
  const db = client.db("movies");

  let body = {
    _id: req.body._id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // password: req.body.password,
  };

  try {
    await client.connect();
    const query = { email: req.body.email };
    // const query2 = {
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    // };
    const user = await db.collection("users").findOne(query);
    // let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.compare(req.body.password, user.password);
    if (hashPassword) {
      //   let users = await db
      //     .collection("users")
      //     .insertOne({ ...body, password: hashPassword });
      res.status(200).json({
        status: 200,
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          friends: user.friends,
          comments: user.comments,
          commentsLiked: user.commentsLiked,
          commentsDisliked: user.commentsDisliked,
          //   postLikes: user.postLikes,
          //   postDisLikes: user.postDisLikes,
          //   ratings: user.ratings,
        },
        message: "valid password",
      });
    } else {
      //   let users = await db
      //     .collection("users")
      //     .insertOne({ ...body, password: hashPassword });
      res.status(400).json({ status: 400, message: "invalid password" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const searchByName = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const movie = req.params.movie;
  const page = req.query.page || 1;

  try {
    // console.log("starting connection");
    await client.connect();
    const db = client.db("movies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API}&query=${movie}&page=${page}`
    );
    console.log(response.data.results);
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
    console.log(friendsUsername);
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
  // const userId = req.params.id;
  // const query = findUser(res.locals.users, userId);
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
    console.log("friends", update);

    if (user.friends.includes(friendsUserName)) {
      res.status(400).json({ status: 400, message: "friend already added" });
    } else {
      const updateMyFriends = await db
        .collection("users")
        .findOneAndUpdate(query, update, { returnDocument: "after" });
      res.status(200).json({ status: 200, data: updateMyFriends.value });
    }

    // if (updateMyFriends) {
    //  res.status(200).json({ status: 200, data: updateMyFriends.value });
    // } else {
    //   res.status(400).json({ status: 400, message: "err getting friends" });
    // }
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
    };

    let comments = await db.collection("comments").insertOne(body);

    const query = {
      userName: req.body.userName,
    };

    const update = {
      $push: {
        comments: _id,
        // postLikes: req.body.likes,
        // postDisLikes: req.body.dislikes,
        // ratings: req.body.ratings,
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

  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.params.userName,
    };

    const user = await db.collection("users").findOne(query);

    if (user.commentsDisliked.includes(_id)) {
      const userDisLiked = await db
        .collection("users")
        .updateOne(
          query,
          { $pull: { commentsDisliked: _id } },
          { $push: { commentsLiked: _id } }
        );

      const postDisLikes = await db
        .collection("comments")
        .updateOne(
          { _id: _id },
          { $inc: { numOfLikes: +1, numOfDislikes: -1 } }
        );
      res.status(200).json({ status: 200, message: "success" });
    } else {
      const userLiked = await db
        .collection("users")
        .updateOne(query, { $push: { commentsLiked: _id } });

      const postLikes = await db
        .collection("comments")
        .updateOne({ _id: _id }, { $inc: { numOfLikes: +1 } });
      res.status(200).json({ status: 200, message: "success" });
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

  try {
    await client.connect();
    const db = client.db("movies");
    const query = {
      userName: req.params.userName,
    };

    const user = await db.collection("users").findOne(query);

    if (user.commentsLiked.includes(_id)) {
      const userLiked = await db
        .collection("users")
        .updateOne(
          query,
          { $pull: { commentsLiked: _id } },
          { $push: { commentsDisliked: _id } }
        );

      const postLikes = await db
        .collection("comments")
        .updateOne(
          { _id: _id },
          { $inc: { numOfLikes: -1, numOfDislikes: +1 } }
        );
      res.status(200).json({ status: 200, message: "success" });
    } else {
      const userLiked = await db
        .collection("users")
        .updateOne(query, { $push: { commentsDisliked: _id } });

      const postLikes = await db
        .collection("comments")
        .updateOne({ _id: _id }, { $inc: { numOfDislikes: +1 } });
      res.status(200).json({ status: 200, message: "success" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  } finally {
    client.close();
  }
};

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
      .updateOne({ userName }, { $pull: { comments: _id } });
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
    console.log("this is usercoomments", comments);

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
    console.log("this iis comments", comments);

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
  signUp,
  signIn,
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
