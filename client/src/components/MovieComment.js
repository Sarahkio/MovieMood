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
                  <ImageWrap>
                    <IMG src={movie.posterPath}></IMG>
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
                        {movie.numOfLikes >= 0 ? (
                          <span>
                            {movie.numOfLikes}
                            <Likes> Like </Likes>
                          </span>
                        ) : null}
                        {movie.numOfDislikes >= 0 ? (
                          <span>
                            {movie.numOfDislikes}
                            <Dislikes> Dislike </Dislikes>
                          </span>
                        ) : null}
                      </WrapLikes>
                    </Break>
                  </ImageWrap>
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
  display: inline-block;
  word-break: break-word;
  margin-left: 10px;
`;

const WrapLikes = styled.div`
  display: flex;
  gap: 15px;
  font-weight: bold;
`;

const IMG = styled.img`
  width: 70px;
  height: 100px;
`;

const ImageWrap = styled.div`
  /* padding: 20px; */
  /* width: fit-content; */
  display: flex;
  align-items: center;
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
  gap: 20px;
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

export default MovieComment;
