import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const SignIn = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { current, setCurrentUser } = useContext(CurrentUserContext);

  // create a reference for each input to store the values
  const email = useRef();
  const password = useRef();

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (ev) => {
    if (email.current.value.length >= 3 && password.current.value.length >= 3) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      const formData = {
        email: email.current.value,
        password: password.current.value,
      };
      console.log(formData);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      fetch(`/signin`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "data");

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
          //   console.log(data);
          //   // Go to homepage
          //   setCurrentUser(data.data);
          //   history.push("/");
        })
        .catch((err) => {
          console(err);
        });
    }
  };

  return (
    <Wrapper>
      {/* <StyledLogo> */}
      {/* </StyledLogo> */}
      <Title>Login to Movie Mood</Title>
      <SignUpForm>
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
        <LoginBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          Sign In
        </LoginBtn>
      </SignUpForm>

      <StyledInfo>
        New to MovieMood? <LoginLink to="/signup">Create an account.</LoginLink>
      </StyledInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 16px;
`;

const StyledLogo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 24px;
  color: darkblue;
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
  width: 336px;
  background-color: lightpink;
  border: 1px solid grey;
  padding: 16px;
  border-radius: 4px;
`;

const StyledInput = styled.input`
  border: 1px solid grey;
  margin-bottom: 12px;
`;

const Email = styled(StyledInput)``;
const Password = styled(StyledInput)``;

const LoginBtn = styled.button`
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

export default SignIn;
