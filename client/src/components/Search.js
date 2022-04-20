import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [searchText, setSearchText] = useState("");

  let history = useHistory();
  const search = useRef();
  const fetchSearch = () => {
    setSearchText("");
    history.push(`/movies/title/${searchText}?page=1`);
  };

  return (
    <>
      <Input
        value={searchText}
        type="text"
        placeholder="search"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && fetchSearch();
        }}
      ></Input>
      <StyledLink
        onClick={() => setSearchText("")}
        ref={search}
        to={`/movies/title/${searchText}?page=1`}
      >
        Go
      </StyledLink>
    </>
  );
};

export default Search;

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
