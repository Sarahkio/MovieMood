import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Header = () => {
  let history = useHistory();
  const BASE_URI = "https://moovie-mood.herokuapp.com/";

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // let userObj = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <MainWrapper>
      <TitleWrap>
        <Link to="/">
          <Title>
            M<Moo>🐮</Moo>
            <Moo>🐮</Moo>vieMood
          </Title>
        </Link>
      </TitleWrap>
      <Wrapper>
        {!currentUser && (
          <>
            <SignUp to="/signUp">Sign Up</SignUp>
            <SignIn to="/signIn">Sign In</SignIn>
          </>
        )}
        {currentUser && (
          <>
            <Name>
              {currentUser.firstName} {currentUser.lastName}
            </Name>
            <Profile to={`/user/${currentUser.userName}`}>Profile</Profile>
            <SignOut onClick={handleLogout}>Sign Out</SignOut>
          </>
        )}
        <Div>
          <Search />
        </Div>
      </Wrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #373b69;
  /* padding: 5px; */
  align-items: center;
`;

const Moo = styled.span`
  font-size: 30px;
  background-color: white;
  border-radius: 70px;
`;

const Title = styled.div`
  font-size: 50px;
  color: #fff;
`;

const TitleWrap = styled.div`
  padding-left: 20px;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
  background-color: #373b69;
`;

const SignIn = styled(Link)`
  display: flex;
  color: white;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  min-width: 10px;
`;

const SignUp = styled(Link)`
  display: flex;
  color: white;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  min-width: 10px;
`;

const SignOut = styled.button`
  display: flex;
  color: white;
  align-items: center;
  background-color: transparent;
  border: none;
  min-width: 100px;

  cursor: pointer;
`;

const Profile = styled(Link)`
  cursor: pointer;
  color: white;
  text-decoration: inherit;
  outline: none;
  font-size: 15px;
`;

const Name = styled.div`
  font-size: 15px;
  font-weight: bold;
  min-width: 100px;
  color: white;
`;

const Input = styled.input`
  background-color: transparent;
  border: 2px solid #22254b;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 16px;
  color: #fff;
  font-family: inherit;

  &:focus {
    outline: 0;
    background-color: #22254b;
  }

  &::placeholder {
    color: #7378c5;
  }
`;

const Div = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
`;

export default Header;
