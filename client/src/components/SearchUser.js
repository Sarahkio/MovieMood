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
    history.push(`/user/${searchText}`);
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="search username"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" && fetchSearch();
        }}
      ></Input>
      <Link ref={search} to={`/user/${searchText}`}>
        Go
      </Link>
    </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;
