import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const BASE_URI = "https://moovie-mood.herokuapp.com/";

  let history = useHistory();
  const search = useRef();
  const fetchSearch = () => {
    setSearchText("");
    history.push(`/movies/title/${searchText}?page=1`);
  };

  return (
    <Wrapper>
      <Wrap>
        <Input
          value={searchText}
          type="text"
          placeholder="search"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" && fetchSearch();
          }}
        ></Input>
        <Click>click to search movies 😊</Click>
      </Wrap>
      <StyledLink
        onClick={() => setSearchText("")}
        ref={search}
        to={`/movies/title/${searchText}?page=1`}
      >
        Go
      </StyledLink>
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Click = styled.span`
  color: white;
  /* margin-top: 5px; */
  font-size: 13px;
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

const StyledLink = styled(Link)`
  color: black;
  margin-left: 5px;
`;
