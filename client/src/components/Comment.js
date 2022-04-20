import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { CurrentUserContext } from "./CurrentUserContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useContext, useState, useEffect } from "react";

const Comment = ({ formattedTimeStamp, _id, comment, commentRating }) => {
  const { currentUser, setCurrentUser, update, setUpdate } =
    useContext(CurrentUserContext);
  const [like, setLike] = useState(currentUser.commentsLiked.includes(_id));
  const [dislike, setDislike] = useState(
    currentUser.commentsDisliked.includes(_id)
  );

  console.log(_id);
  const handleLikeComment = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        like,
        dislike,
        userName: currentUser.userName,
      }),
    };

    fetch(`/like-comment/${_id}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setCurrentUser(data.data);
        if (dislike) {
          setDislike(false);
        }
        setLike(!like);
        setUpdate(!update); // toggle true and false
      });
  };

  const handleDislikeComment = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        dislike,
        like,
        userName: currentUser.userName,
      }),
    };

    fetch(`/dislike-comment/${_id}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (like) {
          setLike(false);
        }
        setDislike(!dislike);
        setUpdate(!update);
      });
  };

  const handleDeleteComment = () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    };

    fetch(`/delete-comment/${currentUser.userName}`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUpdate(!update);
      });
  };
  return (
    <MainWrapper>
      <Navigation to={`/user/${comment.userName}`}>
        {comment.userName}
      </Navigation>
      <TitleWrap>
        <div>{comment.movietitle}</div>
        <Rating
          style={
            commentRating >= 8
              ? { color: "green" }
              : commentRating >= 5
              ? { color: "yellow" }
              : { color: "red" }
          }
        >
          {commentRating}
        </Rating>
      </TitleWrap>
      <Time>{formattedTimeStamp}</Time>
      <Commentsmap>{comment.comments}</Commentsmap>
      {comment.userName === currentUser.userName ? (
        <DeleteButton onClick={handleDeleteComment}>
          Delete Comment
        </DeleteButton>
      ) : (
        <DisabledButton disabled>deleteComment</DisabledButton>
      )}
      <WrapperThumb>
        <ThumbUp onClick={handleLikeComment}>
          <TiThumbsUp style={like ? { fill: "green" } : { fill: "grey" }} />
        </ThumbUp>
        <div>{comment.numOfLikes}</div>
        <ThumbDown onClick={handleDislikeComment}>
          <TiThumbsDown style={dislike ? { fill: "red" } : { fill: "grey" }} />
        </ThumbDown>
        <div>{comment.numOfDislikes}</div>
      </WrapperThumb>
    </MainWrapper>
  );
};

export default Comment;

const MainWrapper = styled.div`
  width: 330px;
  margin-top: 20px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Navigation = styled(NavLink)`
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

const Commentsmap = styled.div`
  margin-bottom: 10px;
  overflow-wrap: break-word;
`;

const WrapperThumb = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  gap: 5px;
`;

const Rating = styled.div`
  background-color: lightgray;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
`;

const Time = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  font-style: italic;
`;

const DeleteButton = styled.button`
  border: none;
  color: white;
  background-color: red;
  padding: 5px;
  border-radius: 15px;
  cursor: pointer;
`;

const DisabledButton = styled.button`
  display: none;
`;

const ThumbUp = styled.button`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const ThumbDown = styled.button`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
