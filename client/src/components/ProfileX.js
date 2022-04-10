import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FriendsProfile from "./FriendsProfile";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [profilePage, setProfilePage] = useState({});
  const [profile, setProfile] = useState(null);
  //   const [update, setUpdate] = useState(false);
  let history = useHistory();

  const { profileId } = useParams();
  console.log(profileId);

  // 8000 localhost
  useEffect(() => {
    fetch(`/api/users/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setProfilePage(data);
        setProfile(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [profileId]);

  console.log(profile);

  return (
    <ProfileWrapper>
      <ProfileBannerWrapper>
        <ProfileBanner src="/images/facespace_bg.jpg"></ProfileBanner>
      </ProfileBannerWrapper>
      {profile && (
        <FaceSpaceWrapper>
          <FaceSpaceProfile src={profile.avatarUrl}></FaceSpaceProfile>
          <FaceSpaceName>{profile.name}</FaceSpaceName>
        </FaceSpaceWrapper>
      )}
      <FriendsWrapperr>
        <FriendsWrapperTitle>
          {profile && <ProfileFriends>{profile.name}'s Friends</ProfileFriends>}
          <Underline></Underline>
        </FriendsWrapperTitle>
        <FriendsWrapperImages>
          {profile &&
            profile.friends.map((id) => {
              return <FriendsProfile id={id} />;
            })}
        </FriendsWrapperImages>
      </FriendsWrapperr>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  /* width: 1000px; */
  /* height: auto; */
`;
const HeaderWrapper = styled.div``;
const HeaderTitle = styled.div``;
const SignIn = styled.div``;
const ProfileBannerWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 450px;
`;
const ProfileBanner = styled.img`
  width: 1620px;
  max-height: 700px;
`;
const FaceSpaceWrapper = styled.div``;
const FaceSpaceName = styled.h2`
  margin-top: 10px;
  margin-left: 550px;
`;
const FaceSpaceProfile = styled.img`
  position: absolute;
  top: 300px;
  left: 280px;
  width: 250px;
  height: 250px;
  border: 8px solid var(--primary-color);
  cursor: pointer;
`;
const FriendsWrapperr = styled.div`
  margin-top: 120px;
  margin-left: 270px;
  position: relative;
`;
const FriendsWrapperTitle = styled.div``;
const ProfileFriends = styled.h1``;
const Underline = styled.div`
  background-color: var(--primary-color);
  width: 800px;
  height: 1px;
  /* margin-top: 20px; */
`;
const FriendsWrapperImages = styled.div`
  display: flex;
  /* border: 2px solid blue; */
  /* flex-direction: row; */
`;

export default Profile;
