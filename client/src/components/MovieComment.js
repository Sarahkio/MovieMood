import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
// import { CurrentUserContext } from "./CurrentUserContext";

const movieComment = ({ movie }) => {
  return (
    <>
      <Link>{movie.userName}</Link>
      <div>{movie.movietitle}</div>
      <div>{movie.comments}</div>
    </>
  );
};

const Link = styled(Link)``;

export default movieComment;
