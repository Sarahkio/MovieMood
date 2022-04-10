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

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGenres = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    // console.log("starting connection");
    await client.connect();
    const db = client.db("movies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${MOVIE_API}`
    );
    if (response) {
      res.status(200).json({ status: 200, data: response.data.genres });
    } else {
      res.status(400).json({ status: 400, message: "genres not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "unknown error" });
  } finally {
    client.close();
  }
};

const getGenre = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const page = req.query.page || 1;
  const name = req.params.name;
  const names = req.params.names.split(",");
  try {
    await client.connect();
    const db = client.db("movies");
    let genreList = genres
      .filter((genre) => {
        return names.includes(genre.id.toString());
      })
      .map((genre) => {
        return genre.id;
      })
      .join(",");
    // console.log("hello, ", genreList);
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${MOVIE_API}&page=${page}&with_genres=${genreList}`
    );
    // console.log(response.data.results);
    if (response) {
      res.status(200).json({
        status: 200,
        data: response.data.results,
        total_pages: response.data.total_pages,
      });
    } else {
      res.status(400).json({ status: 400, message: "No movies found" });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.stack });
  } finally {
    client.close();
  }
};

// details
const getMovie = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = req.params.id;

  try {
    // console.log("starting connection");
    await client.connect();
    const db = client.db("movies");
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${MOVIE_API}`
    );
    // console.log(response.data);
    if (response) {
      res.status(200).json({ status: 200, data: response.data });
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
  // const userId = req.params.id;
  //   const userName = req.params.userName;
  // const query = findUser(res.locals.users, userId);
  try {
    await client.connect();
    const db = client.db("movies");

    const query = {
      userName: req.body.userName,
    };
    // console.log("queryuser", query);
    // const query2 = {
    //   userName: req.body.userName,
    // };
    // console.log("query2frriends", query2);

    const user = await db.collection("users").findOne(query);

    // xxxx.updateOne(
    //   { username: req.body.username },
    //   { $push: { friends: YOU } }
    // );
    // xxxx.updateOne(
    //   { username: req.body.username },
    //   { $push: { friends: currentUser } }
    // );
    // const friends = await db.collection("users").findOne(query2);
    // do i need an include functioin?
    // // filter out duplicates, use set instead to filter method
    // const set = new Set(user);
    // // set is showing the object, we want set to show the array
    // console.log(set);
    // console.log("username", user);
    // console.log("friends", friends);
    const update = {
      $push: {
        friends: req.params.friendsUserName,
      },
    };
    console.log("friends", update);
    // const update2 = {
    //   $push: {
    //     friends: req.body.friendsUserName,
    //   },
    // };
    // console.log("username", update2);
    const updateMyFriends = await db
      .collection("users")
      .findOneAndUpdate(query, update, { returnDocument: "after" });
    // const updateFriends = await db
    //   .collection("users")
    //   .updateOne(query2, update2);
    if (updateMyFriends) {
      res.status(200).json({ status: 200, data: updateMyFriends.value });
    } else {
      res.status(400).json({ status: 400, message: "err getting friends" });
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

module.exports = {
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
  removeFriends,
};
