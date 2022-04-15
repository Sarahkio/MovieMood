import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import moment from "moment";

import { CurrentUserContext } from "./CurrentUserContext";

const MovieComment = () => {
  const { userName: friendUserName } = useParams();
  const [status, setStatus] = useState("loading");
  const [movieComment, setMovieComment] = useState(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // const [_id, set_id] = useState(currentUser.comments.includes(friendUserName));
  //9:38 AM · Jan 6 2020
  useEffect(() => {
    // movie comments by userName
    console.log(friendUserName);
    fetch(`/user-comment/${friendUserName}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieComment(data.data);
        setStatus("loaded");
        console.log(data.data);
      });
  }, [friendUserName]);
  // console.log(_id);
  // const handleDeleteComment = () => {
  //   const requestOptions = {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ _id: currentUser._id }),
  //   };

  //   fetch(`/delete-comment/${friendUserName}`, requestOptions)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // if (_id) {
  //       //   set_id(_id);
  //       // } else {
  //       //   set_id(false);
  //       // }
  //       // setCurrentUser(data.data);
  //       // console.log(data.data);
  //     });
  // };

  console.log(movieComment);
  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && currentUser && (
        <WrapperList>
          {movieComment?.length ? (
            movieComment?.map((movie) => {
              let timeStamp = movie.timeOfComments;
              const formattedTimeStamp =
                moment(timeStamp).format("MMMM Do YYYY");
              return (
                <>
                  <div>{movie.userName}</div>
                  <Navigation to={`/movie/${movie.movieid}`}>
                    {movie.movietitle}
                  </Navigation>
                  <div>{movie.numOfRatings}</div>
                  <Commentsmap>{movie.comments}</Commentsmap>
                  <div>{formattedTimeStamp}</div>
                  {/* <button onClick={handleDeleteComment}>Delete Comment</button> */}
                </>
              );
            })
          ) : (
            <div>not commented yet</div>
          )}
        </WrapperList>
      )}
    </>
  );
};

// const Link = styled(Link)``;
const Navigation = styled(NavLink)``;

const Commentsmap = styled.div`
  margin-bottom: 10px;
`;
const WrapperList = styled.div`
  margin-top: 20px;
`;

// const Rating = styled.div``;

export default MovieComment;
