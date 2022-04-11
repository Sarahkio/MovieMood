import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { CurrentUserContext } from "./CurrentUserContext";

const FriendsProfile = ({ id }) => {
  const [friends, setFriends] = useState(false); // keep it falsey

  let history = useHistory();
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setProfilePage(data);
        setFriends(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // this is returring one image tag n profile (depends on how many friends they have  - length of friends array)
  return (
    friends && (
      <FriendsWrapper
        onClick={() => {
          history.push(`/users/${friends.id}`);
        }}
      >
        <FriendsImages src={friends.avatarUrl}></FriendsImages>
        <FriendsName>{friends.name}</FriendsName>
      </FriendsWrapper>
    )
  );
};
// friennds must be true, if no friends returns no friends
const FriendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
  /* border: 2px solid blue; */
`;

const FriendsNameWrapper = styled.div`
  /* bottom: 130px; */
  /* left: 200px; */
`;
const FriendsName = styled.div`
  position: absolute;
  text-align: center;
  background-color: white;
  opacity: 0.5;
  bottom: 2px;
  width: 100px;
  /* font-weight: bold; */
  /* border: 2px solid blue; */
`;
const FriendsImages = styled.img`
  position: relative;
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-right: 5px;
  border: 2px solid var(--primary-color);
`;

export default FriendsProfile;
