import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
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
        // console.log(data.data);
      });
  }, []);

  let history = useHistory();

  if (!movieDetails) {
    return <>Loading...</>;
  }

  return (
    <>
      <Wrapper>
        <CategoriesWrapper>
          <div>
            <CategoryWrapper>
              <Element src={IMG_URI + movieDetails.poster_path}></Element>
              <ElementId>
                {movieDetails.genres.map((el) => {
                  return `genre: ${el.name} `;
                })}
              </ElementId>
              <ElementTitle>{movieDetails.original_title}</ElementTitle>
              <div>{movieDetails.overview}</div>
              <ElementVote>{movieDetails.vote_average}</ElementVote>
              <div>{movieDetails.status}</div>
              <div>{movieDetails.tagline}</div>
              <button onClick={() => history.goBack()}>Previous Page</button>
            </CategoryWrapper>
          </div>
        </CategoriesWrapper>
      </Wrapper>
    </>
  );
};

export default MovieDetails;

const Wrapper = styled.div``;

const CategoriesWrapper = styled.div``;

const CategoryWrapper = styled.div``;

const Element = styled.img``;

const ElementId = styled.div``;

const ElementTitle = styled.div``;

const ElementVote = styled.div``;

const Link = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
`;
