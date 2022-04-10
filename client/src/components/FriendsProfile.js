import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

const FriendsProfile = ({ id }) => {
  const [friends, setFriends] = useState(false); // keep it falsey
  // const [status, setStatus] = useState("loading");

  let history = useHistory();
  useEffect(() => {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        // setProfilePage(data);
        setFriends(data.data);
        // setStatus("loaded");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // this is returring one image tag n profile (depends on how many friends they have  - length of friends array)

  return (
    <>
      {friends && (
        <FriendsWrapper to={`/user/${friends.userName}`}>
          <FriendsName>{friends.firstName}</FriendsName>
        </FriendsWrapper>
      )}
    </>
  );
};
// friennds must be true, if no friends returns no friends
const FriendsWrapper = styled(Link)``;

const FriendsName = styled.div``;

export default FriendsProfile;
