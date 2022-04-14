import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import moment from "moment";

// // import { CurrentUserContext } from "./CurrentUserContext";

const MovieDetailsComment = () => {
  const [status, setStatus] = useState("loading");
  const [movieDetailsComment, setMovieDetailsComment] = useState(null);
  const { id } = useParams();
  //9:38 AM · Jan 6 2020
  useEffect(() => {
    // movie comments by id
    console.log(id);
    fetch(`/movie-comment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetailsComment(data.data);
        setStatus("loaded");
        console.log(data.data);
      });
  }, [id]);

  return (
    <WrapperList>
      {movieDetailsComment?.length ? (
        movieDetailsComment?.map((movie) => {
          return (
            <>
              <Navigation to={`/user/${movie.userName}`}>
                {movie.userName}
              </Navigation>
              <div>{movie.movietitle}</div>
              <Commentsmap>{movie.comments}</Commentsmap>
            </>
          );
        })
      ) : (
        <div>not commented yet</div>
      )}
    </WrapperList>
  );
};

// const Link = styled(Link)``;
const Navigation = styled(NavLink)``;

const Commentsmap = styled.div`
  margin-bottom: 10px;
`;
const WrapperList = styled.div`
  margin-top: 20px;
`;

export default MovieDetailsComment;
