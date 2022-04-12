import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Commentbox from "./Commentbox";
import { NavLink } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  // const [movieId, setMovieId] = useState(null);
  const [movieComment, setMovieComment] = useState(null);
  const [status, setStatus] = useState("loading");

  const { id } = useParams();
  const BASE_URI = "https://api.themoviedb.org/3";
  const IMG_URI = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    // movie details
    // console.log(id);
    fetch(`/movie/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data.data);
        setStatus("loaded");
        // setMovieId(data.id);
        // console.log(data.data);
      });
  }, []);

  useEffect(() => {
    // movie comments by id
    console.log(id);
    fetch(`/movie-comment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieComment(data.data);
        setStatus("loaded");
        console.log(data.data);
      });
  }, []);

  let history = useHistory();

  if (!movieDetails) {
    return <>Loading...</>;
  }

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && movieDetails && movieComment && (
        <Wrapper>
          <CategoriesWrapper>
            <div>
              <CategoryWrapper>
                <Element src={IMG_URI + movieDetails.poster_path}></Element>
                <ElementId>
                  {movieDetails &&
                    movieDetails?.genres.map((el) => {
                      return `genre: ${el.name} `;
                    })}
                </ElementId>
                <ElementTitle>{movieDetails.original_title}</ElementTitle>
                <div>{movieDetails.overview}</div>
                <ElementVote>{movieDetails.vote_average}</ElementVote>
                <div>{movieDetails.status}</div>
                <div>{movieDetails.tagline}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history.goBack();
                  }}
                >
                  Previous Page
                </button>
              </CategoryWrapper>
            </div>
            <Commentbox id={id} title={movieDetails.original_title} />
            {/* limit={300} value="" */}
          </CategoriesWrapper>
          <WrapperComments>
            <Comments>Comments</Comments>
            <Underline></Underline>
            <WrapperList>
              {movieComment &&
                movieComment?.map((movie) => {
                  return (
                    <>
                      <Navigation to={`/user/${movie.userName}`}>
                        {movie.userName}
                      </Navigation>
                      <div>{movie.movietitle}</div>
                      <Commentsmap>{movie.comments}</Commentsmap>
                    </>
                  );
                })}
            </WrapperList>
          </WrapperComments>
        </Wrapper>
      )}
    </>
  );
};

export default MovieDetails;

const Wrapper = styled.div`
  position: relative;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryWrapper = styled.div``;

const Element = styled.img``;

const ElementId = styled.div``;

const ElementTitle = styled.div``;

const ElementVote = styled.div``;

const Navigation = styled(NavLink)``;

// const userName = styled(Link)`
//   color: black;
//   text-decoration: none;
//   font-size: 16px;
//   font-weight: bold;
// `;

const WrapperComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

const Comments = styled.div`
  margin-top: 20px;
`;

const Underline = styled.div`
  width: 200px;
  height: 2px;
  margin-top: 10px;
  background-color: black;
`;

const WrapperList = styled.div`
  margin-top: 20px;
`;
const Commentsmap = styled.div`
  margin-bottom: 10px;
`;
