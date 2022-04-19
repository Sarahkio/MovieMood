import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import moment from "moment";

import Comment from "./Comment";
import { CurrentUserContext } from "./CurrentUserContext";

const MovieDetailsComment = () => {
  const [status, setStatus] = useState("loading");
  const { currentUser, setCurrentUser, update } =
    useContext(CurrentUserContext);
  const [movieDetailsComment, setMovieDetailsComment] = useState(null);

  const { id: _id } = useParams();
  //9:38 AM · Jan 6 2020
  useEffect(() => {
    // movie comments by id
    console.log(_id);
    fetch(`/movie-comment/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetailsComment(data.data);
        setStatus("loaded");
      });
  }, [_id, update]);
  console.log(movieDetailsComment);
  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && movieDetailsComment && currentUser && (
        <WrapperList>
          {movieDetailsComment?.length ? (
            movieDetailsComment?.map((comment) => {
              let timeStamp = comment.timeOfComments;
              const formattedTimeStamp = moment(timeStamp).format(
                "h:mm a, MMMM Do YYYY"
              );
              return (
                <Comment
                  formattedTimeStamp={formattedTimeStamp}
                  _id={comment._id}
                  comment={comment}
                  commentRating={comment.numOfRatings}
                />
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
  /* border: 2px solid red; */
  height: 300px;
  display: flex;
  /* align-items: center; */
  width: fit-content;
  gap: 10px;

  flex-wrap: wrap;
`;

const WrapperThumb = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  gap: 5px;
`;

const ThumbUp = styled.button`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  border: none;
  /* color: gray; */
  background-color: transparent;
`;

const ThumbDown = styled.button`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  border: none;
  /* color: gray; */
  background-color: transparent;
`;

export default MovieDetailsComment;
