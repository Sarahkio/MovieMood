import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import FriendsProfile from "./FriendsProfile";
import SearchUser from "./SearchUser";
import { NavLink } from "react-router-dom";
import MovieComment from "./MovieComment";
import { GoPerson } from "react-icons/go";

const Profile = () => {
  const { currentUser, setError, setCurrentUser } =
    useContext(CurrentUserContext);
  const { userName: friendUserName } = useParams();
  const [currentProfile, setCurrentProfile] = useState({});
  const [status, setStatus] = useState("loading");

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
      })
      .then((data) => {
        setCurrentUser(data.data);
      });
  };

  useEffect(() => {
    setStatus("loading");
    fetch(`/user/${friendUserName}`)
      .then((res) => res.json())
      .then((data) => {
        // setCurrentUser(data.data);

        if (data.data) {
          setCurrentProfile(data.data);
          setStatus("loaded");
        } else {
          setCurrentProfile(null);
          setStatus("loaded");
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, [friendUserName]);

  console.log(currentProfile);

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && currentUser && (
        <ProfileWrapper>
          <SearchUser />
          {currentProfile !== null ? (
            <>
              <Wrapper>
                <PersonWrap>
                  <Person />
                </PersonWrap>
                <WrapInfo>
                  <UserName>{currentProfile.userName}</UserName>
                  <CommentsLiked>
                    <span>
                      <Liked>Liked: </Liked>
                      {currentProfile.commentsLiked.length}
                    </span>
                    <span>
                      <Disliked>Disliked: </Disliked>
                      {currentProfile.commentsDisliked.length}
                    </span>
                  </CommentsLiked>
                  {currentProfile?.userName === currentUser?.userName ? (
                    <div></div>
                  ) : (
                    <>
                      {currentUser.friends.includes(friendUserName) ? (
                        <>
                          <Delete onClick={handleUnFollow}>
                            remove friend
                          </Delete>
                        </>
                      ) : (
                        <AddButton onClick={handleFollow}>Add Friend</AddButton>
                      )}
                    </>
                  )}
                </WrapInfo>
              </Wrapper>
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

              <WrapperComments>
                <WrapperCommentsUnderline>
                  <Comments>Comments</Comments>
                  <Underline2></Underline2>
                </WrapperCommentsUnderline>
                {status === "loading" && <div>Loading...</div>}
                {status === "loaded" && currentProfile && <MovieComment />}
              </WrapperComments>
            </>
          ) : (
            <>
              <WrapperMessage>
                <Face>🙁</Face>
                <Title>Profile not found, case sensitive</Title>
              </WrapperMessage>
            </>
          )}
        </ProfileWrapper>
      )}
    </>
  );
};
const ProfileWrapper = styled.div`
  position: relative;
  width: 800px;
`;

const CommentsLiked = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WrapperMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`;

const WrapperCommentsUnderline = styled.div``;

const Face = styled.div`
  font-size: 50px;
`;

const Liked = styled.span`
  font-weight: bold;
  font-style: italic;
  color: darkgreen;
`;

const Disliked = styled.span`
  font-weight: bold;
  font-style: italic;
  color: darkred;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Underline = styled.div`
  height: 1px;
  width: 200px;
  margin-top: 10px;
  background-color: black;
`;

const Wrapper = styled.div`
  display: flex;
`;

const UserName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
const FriendsWrapperImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`;
const AddButton = styled.button`
  margin-top: 10px;
  height: fit-content;
  border: none;
  color: white;
  background-color: green;
  padding: 5px;
  border-radius: 15px;
  width: fit-content;
  cursor: pointer;
`;

const Delete = styled.button`
  margin-top: 10px;
  border: none;
  color: white;
  background-color: red;
  padding: 5px;
  border-radius: 15px;
  cursor: pointer;
  width: fit-content;
`;

const FriendsWrapperr = styled.div`
  margin-top: 15px;
  margin-left: 200px;
  position: relative;
`;
const FriendsWrapperTitle = styled.div``;
const ProfileFriends = styled.h1``;

const WrapperComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  height: 900px;
`;

const Comments = styled.div`
  margin-top: 20px;
`;

const Person = styled(GoPerson)`
  font-size: 50px;
  color: gray;
`;

const PersonWrap = styled.div`
  background-color: lightgray;
  padding: 20px;
  width: fit-content;
  display: flex;
`;

const WrapInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  align-items: center;
`;

const Underline2 = styled.div`
  width: 200px;
  height: 2px;
  margin-top: 10px;
  background-color: black;
`;

export default Profile;
