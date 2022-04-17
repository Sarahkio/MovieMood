import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Movies from "./Movies";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import MovieDetails from "./MovieDetails";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Search from "./Search";
import SearchUser from "./SearchUser";
import Profile from "./Profile";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <WrapperContent>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/user/:userName">
              <Profile />
            </Route>
            <Route exact path="/movies/:searchType/:searchParams">
              <Movies />
            </Route>
            <Route exact path="/movie/:id">
              <MovieDetails />
            </Route>
            <Route exact path="/search/movie">
              <Search />
            </Route>
            <Route exact path="/signUp">
              <SignUp />
            </Route>
            <Route exact path="/signIn">
              <SignIn />
            </Route>
          </Switch>
        </WrapperContent>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const WrapperContent = styled.div`
  display: flex;
  justify-content: center;
`;

export default App;
