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

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Home />
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
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export default App;
