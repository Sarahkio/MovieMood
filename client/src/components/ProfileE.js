import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";

// import CircularProgress from "@material-ui/core/CircularProgress";
// import moment from "moment";
// import { useHistory } from "react-router-dom";

const Profile = () => {
  const { currentUser, setError } = useContext(CurrentUserContext);
  const { userName } = useParams();
  const [currentProfile, setCurrentProfile] = useState({});
  //   const [currentFeed, setCurrentFeed] = useState(null);
  const [status, setStatus] = useState("loading");
  //   const [addStatus, setAddStatus] = useState(false);

  // add friends *****
  //   const handleFollow = () => {
  //     const requestOptions = {
  //       method: "PUT",
  //     };

  //     fetch(`/api/${profileId}/follow`, requestOptions).then((response) => {
  //       response.json();

  //       setFollowStatus(true);
  //       console.log(followStatus);
  //     });
  //   };

  useEffect(() => {
    fetch(`/user/${userName}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentProfile(data.data);
        setStatus("loaded");
        // setPending(false);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, [userName]);

  // comments useEffect *****

  //use thiis for small tweets
  //   let timeStamp = currentProfile.timeStamp;
  //   const formattedTimeStamp = moment(timeStamp).format("MMMM Do YYYY");
  //9:38 AM · Jan 6 2020
  //   let history = useHistory();

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && (
        <ProfileWrapper>
          <FirstName>{currentProfile.FirstName}</FirstName>
          <LastName>{currentProfile.LastName}</LastName>
          <UserName>{currentProfile.userName}</UserName>
        </ProfileWrapper>
      )}
    </>
  );
};
const ProfileWrapper = styled.div`
  position: relative;
  width: 800px;
`;

const FirstName = styled.div``;
const LastName = styled.div``;
const UserName = styled.div``;

export default Profile;
