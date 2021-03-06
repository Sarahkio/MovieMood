import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SignUp = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const BASE_URI = "https://moovie-mood.herokuapp.com/";

  // create a reference for each input to store the values
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const userName = useRef();

  const handleChange = (ev) => {
    if (password.current.value !== confirmPassword.current.value) {
      setValid(false);
      setDisabled(true);
      return;
    }
    if (
      firstName.current.value.length > 0 &&
      lastName.current.value.length > 0 &&
      email.current.value.length > 0 &&
      password.current.value.length > 0 &&
      confirmPassword.current.value.length > 0 &&
      userName.current.value.length > 0
    ) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      const formData = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        userName: userName.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      fetch(`/login/signup`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data, "data");
          if (data.data) {
            window.localStorage.setItem(
              "user",
              JSON.stringify(data.data.userName)
            );
            setCurrentUser(data.data);
            history.push("/");
          } else {
            setLoginError("error");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Wrapper>
      {/* <StyledLogo> */}
      {/* </StyledLogo> */}
      <Title>Sign up to Movie Mood</Title>
      <SignUpForm>
        <FirstName
          type="text"
          name="first-name"
          required
          placeholder="First Name"
          ref={firstName}
          onChange={handleChange}
        ></FirstName>
        <LastName
          type="text"
          name="last-name"
          required
          placeholder="Last Name"
          ref={lastName}
          onChange={handleChange}
        ></LastName>
        <UserName
          type="text"
          name="last-name"
          required
          placeholder="Last Name"
          ref={userName}
          onChange={handleChange}
        ></UserName>

        <Email
          type="email"
          name="email"
          required
          placeholder="E-mail"
          ref={email}
          onChange={handleChange}
        ></Email>

        <Password
          type="password"
          name="password"
          required
          placeholder="Password"
          ref={password}
          onChange={handleChange}
        ></Password>

        <ConfirmPassword
          type="password"
          name="confirm-password"
          required
          placeholder="Confirm Password"
          ref={confirmPassword}
          onChange={handleChange}
        ></ConfirmPassword>

        <SignUpBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          Sign Up
          {loginError === "error" && <Message>user does not exist</Message>}
        </SignUpBtn>
      </SignUpForm>

      <StyledInfo>
        Already have an account? <LoginLink to="/SignIn">Login</LoginLink>
      </StyledInfo>
    </Wrapper>
  );
};

const Message = styled.div`
  color: red;
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background-color: #22254b;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 24px;
  color: white;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: lightpink;

  border: 1px solid grey;
  padding: 16px;
  border-radius: 4px;
  width: 336px;
`;

const StyledInfo = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
  width: 262px;
  background-color: lightpink;
  border: 1px solid grey;
  padding: 16px;
  border-radius: 4px;
  width: 336px;
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  margin-bottom: 12px;
`;

const FirstName = styled(StyledInput)``;
const LastName = styled(StyledInput)``;
const UserName = styled(StyledInput)``;

const Email = styled(StyledInput)``;
const Password = styled(StyledInput)``;
const ConfirmPassword = styled(StyledInput)``;

const SignUpBtn = styled.button`
  border: none;
  background-color: purple;
  color: lightpink;
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;

  ${({ disabled }) =>
    disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;
      `
      : `
      cursor: pointer;
  `};
`;

const LoginLink = styled(NavLink)``;

export default SignUp;
