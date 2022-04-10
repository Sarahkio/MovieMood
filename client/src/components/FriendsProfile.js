import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";

const FriendsProfile = ({ id }) => {
  const [friends, setFriends] = useState(false); // keep it falsey

  let history = useHistory();
  useEffect(() => {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
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
          history.push(`/users/${friends.userName}`);
        }}
      >
        <FriendsName>{friends.firstName}</FriendsName>
      </FriendsWrapper>
    )
  );
};
// friennds must be true, if no friends returns no friends
const FriendsWrapper = styled.div``;

const FriendsName = styled.div``;

export default FriendsProfile;
