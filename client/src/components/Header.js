import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Search from "./Search";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Header = () => {
  let history = useHistory();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  let userObj = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    setCurrentUser(null);
    // sessionStorage.removeItem("user");  I dont need this
  };

  return (
    <MainWrapper>
      <TitleWrap>
        <Link to="/">
          <Title>MovieMood</Title>
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
          <div>
            {userObj.firstName} {userObj.lastName}
          </div>
        )}
        <Form id="form">
          <Search />
          {/* <Input type="text" placeholder="search"></Input> */}
        </Form>
      </Wrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #373b69;
  align-items: center;
`;

const Title = styled.div`
  font-size: 40px;
  color: #fff;
`;

const TitleWrap = styled.div`
  padding-left: 20px;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: end;
  background-color: #373b69;
`;

const SignIn = styled(Link)`
  display: flex;
  color: white;
  align-items: center;
  background-color: transparent;
  border: none;
`;

const SignUp = styled(Link)`
  display: flex;
  color: white;
  align-items: center;
  background-color: transparent;
  border: none;
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

const Form = styled.form``;

export default Header;
