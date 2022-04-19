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

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && currentUser && (
        <WrapperList>
          {movieComment?.length ? (
            movieComment?.map((movie) => {
              let timeStamp = movie.timeOfComments;
              const formattedTimeStamp = moment(timeStamp).format(
                "h:mm a, MMMM Do YYYY"
              );
              return (
                <WrapperComments>
                  {/* <div>{movie.userName}</div> */}
                  <Break>
                    <WrapperTitle>
                      <Navigation to={`/movie/${movie.movieid}`}>
                        {movie.movietitle}
                      </Navigation>
                      <Rating
                        style={
                          movie.numOfRatings >= 8
                            ? { color: "green" }
                            : movie.numOfRatings >= 5
                            ? { color: "yellow" }
                            : { color: "red" }
                        }
                      >
                        {movie.numOfRatings}
                      </Rating>
                    </WrapperTitle>
                    <Time>{formattedTimeStamp}</Time>
                    <Commentsmap>{movie.comments}</Commentsmap>
                    <WrapLikes>
                      {movie.numOfLikes >= 1 ? (
                        <span>
                          <Likes>Likes: </Likes> {movie.numOfLikes}
                        </span>
                      ) : null}
                      {movie.numOfDislikes >= 1 ? (
                        <span>
                          <Dislikes>Dislikes: </Dislikes>
                          {movie.numOfDislikes}
                        </span>
                      ) : null}
                    </WrapLikes>
                  </Break>
                  {/* <button onClick={handleDeleteComment}>Delete Comment</button> */}
                </WrapperComments>
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

const Break = styled.div`
  /* border: 2px solid red; */
  display: inline-block;
  word-break: break-word;
`;

const WrapLikes = styled.div`
  display: flex;
  gap: 10px;
`;

const Likes = styled.span`
  font-weight: bold;
  font-style: italic;
  color: darkgreen;
`;

const Dislikes = styled.span`
  font-weight: bold;
  font-weight: bold;
  font-style: italic;
  color: darkred;
`;

// const Link = styled(Link)``;
const Navigation = styled(NavLink)`
  color: black;
  font-weight: bold;
  cursor: pointer;
`;

const Commentsmap = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  /* border: 2px solid blue; */
`;
const WrapperList = styled.div`
  margin-top: 20px;
  /* border: 2px solid blue; */
  display: flex;
  /* height: 800px; */
  width: fit-content;
  gap: 10px;

  flex-wrap: wrap;
`;

const WrapperComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /* border: 2px solid yellow; */
  width: 380px;
`;

const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Rating = styled.div`
  background-color: lightgray;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
`;

const Time = styled.div`
  font-style: italic;
`;

// const Rating = styled.div``;

export default MovieComment;
