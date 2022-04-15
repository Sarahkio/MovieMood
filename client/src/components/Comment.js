import { TiThumbsUp, TiThumbsDown } from "react-icons/ti";
import { CurrentUserContext } from "./CurrentUserContext";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useContext, useState, useEffect } from "react";

const Comment = ({ formattedTimeStamp, _id, comment }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // setCurrentUser(data.data);
        if (dislike) {
          setDislike(false);
        }
        setLike(!like); // toggle true and false
      });
  };

  console.log(like, dislike);

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
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // setCurrentUser(data.data);
        if (like) {
          setLike(false);
        }
        setDislike(!dislike);
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

    fetch(`/delete-comment/${_id}`, requestOptions)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {});
  };
  console.log(comment);
  return (
    <>
      <Navigation to={`/user/${comment.userName}`}>
        {comment.userName}
      </Navigation>
      <div>{comment.movietitle}</div>
      <div>{formattedTimeStamp}</div>
      <Commentsmap>{comment.comments}</Commentsmap>
      {comment.userName === currentUser.userName ? (
        <button onClick={handleDeleteComment}>Delete Comment</button>
      ) : (
        <button disabled>deleteComment</button>
      )}
      <WrapperThumb>
        <ThumbUp onClick={handleLikeComment}>
          <TiThumbsUp style={like ? { fill: "green" } : { fill: "grey" }} />
        </ThumbUp>
        <div>{comment.numOfLikes}</div>
        {/* <span>5</span> */}
        <ThumbDown onClick={handleDislikeComment}>
          <TiThumbsDown style={dislike ? { fill: "red" } : { fill: "grey" }} />
        </ThumbDown>
        <div>{comment.numOfDislikes}</div>
      </WrapperThumb>
    </>
  );
};

export default Comment;

const Navigation = styled(NavLink)``;

const Commentsmap = styled.div`
  margin-bottom: 10px;
`;
const WrapperList = styled.div`
  margin-top: 20px;
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
