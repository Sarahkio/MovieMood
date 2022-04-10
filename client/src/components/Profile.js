import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FriendsProfile from "./FriendsProfile";
import SearchUser from "./SearchUser";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import moment from "moment";
// import { useHistory } from "react-router-dom";

const Profile = () => {
  const { currentUser, setError, setCurrentUser } =
    useContext(CurrentUserContext);
  const { userName: friendUserName } = useParams();
  const [currentProfile, setCurrentProfile] = useState({});
  const [reload, setReload] = useState(false);
  //   const [currentFeed, setCurrentFeed] = useState(null);
  const [status, setStatus] = useState("loading");
  // const [message, setMessage] = useState("");

  // setStatus("loading");
  console.log(friendUserName);
  // const [addStatus, setAddStatus] = useState(false);

  // add friends *****
  const handleFollow = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: currentUser.userName }),
    };

    fetch(`/user/add-friends/${friendUserName}`, requestOptions)
      .then((response) => {
        return response.json();
        // setCurrentUser({
        //   ...currentUser,
        //   friends: [...currentUser.friends, friendUserName],
        // });

        // setAddStatus(true);
      })
      .then((data) => {
        setCurrentUser(data.data);
      });
  };

  // remove friends ******
  const handleUnFollow = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: currentUser.userName }),
    };

    fetch(`/user/remove-friends/${friendUserName}`, requestOptions)
      .then((response) => {
        return response.json();
        // console.log(response.data);
        // setCurrentUser(response.data);
        // setCurrentUser({
        //   ...currentUser,
        //   friends: [...currentUser.friends, friendUserName],
        // });
      })
      .then((data) => {
        setCurrentUser(data.data);
      });
  };

  useEffect(() => {
    fetch(`/user/${friendUserName}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentProfile(data.data);
        setStatus("loaded");
        console.log(data.data);
        // setCurrentUser(data.data);

        // if (friendUserName !== data.data.userName) {
        //   setMessage("no results");
        // }
      })
      .catch((err) => {
        setError(err);
      });
  }, [friendUserName]);

  // console.log(currentProfile.friends.includes(currentUser));
  // const FriendAdded = currentProfile.friends.find((friend) => {
  //   return friend;
  // });

  // console.log(FriendAdded);

  // const friendArray = currentProfile.friends.filter(
  //   (item) => !currentUser.includes(item)
  // );

  // console.log(friendArray);

  // comments useEffect *****

  //use thiis for small tweets
  //   let timeStamp = currentProfile.timeStamp;
  //   const formattedTimeStamp = moment(timeStamp).format("MMMM Do YYYY");
  //9:38 AM · Jan 6 2020
  //   let history = useHistory();

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && currentProfile && currentUser && (
        <ProfileWrapper>
          <SearchUser />
          <FirstName>{currentProfile.firstName}</FirstName>
          <LastName>{currentProfile.lastName}</LastName>
          <UserName>{currentProfile.userName}</UserName>
          {currentProfile?.userName !== currentUser?.userName && (
            <>
              {currentUser.friends.includes(friendUserName) ? (
                <>
                  <Friend>Friend</Friend>
                  <Delete onClick={handleUnFollow}>remove friend</Delete>
                </>
              ) : (
                <AddButton onClick={handleFollow}>Add Friend</AddButton>
              )}
              {/* {currentUser.friends.includes(!friendUserName) ? (
                <>
                  <AddButton onClick={handleFollow}>Add Friend</AddButton>
                </>
              ) : (
                <>
                  <Friend>Friend</Friend>
                  <Delete onClick={handleUnFollow}>remove friend</Delete>
                </>
              )} */}
              {/* <AddButton onClick={handleFollow}>
                {FriendAdded ? "Friend" : "Add Friend"}
              </AddButton> */}
            </>
          )}
          <FriendsWrapperr>
            <FriendsWrapperTitle>
              <ProfileFriends>
                {currentProfile.firstName}'s Friends
              </ProfileFriends>
              <Underline></Underline>
            </FriendsWrapperTitle>
            <FriendsWrapperImages>
              {currentProfile &&
                currentProfile?.friends.map((id) => {
                  return <FriendsProfile id={id} />;
                })}
            </FriendsWrapperImages>
          </FriendsWrapperr>
        </ProfileWrapper>
      )}
    </>
  );
};
const ProfileWrapper = styled.div`
  position: relative;
  width: 800px;
`;

const Underline = styled.div`
  background-color: var(--primary-color);
  width: 800px;
  height: 1px;
  /* margin-top: 20px; */
`;

const FirstName = styled.div``;
const LastName = styled.div``;
const UserName = styled.div``;
const FriendsWrapperImages = styled.div`
  display: flex;
`;
const AddButton = styled.button``;
const Friend = styled.div``;
const Delete = styled.button``;

const FriendsWrapperr = styled.div`
  margin-top: 120px;
  margin-left: 270px;
  position: relative;
`;
const FriendsWrapperTitle = styled.div``;
const ProfileFriends = styled.h1``;

export default Profile;
