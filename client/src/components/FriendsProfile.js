import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

const FriendsProfile = ({ id }) => {
  const [friends, setFriends] = useState(false); // keep it falsey

  let history = useHistory();
  useEffect(() => {
    fetch(`/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
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
const FriendsWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;
`;

const FriendsName = styled.div`
  margin-right: 10px;
  margin-top: 10px;
`;

export default FriendsProfile;
