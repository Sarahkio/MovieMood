import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GenreContext } from "./GenreContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const { names } = useParams();
  const IMG_URI = "https://image.tmdb.org/t/p/w500";
  const BASE_URI = "https://api.themoviedb.org/3";
  // const [page, setPage] = useState(1);
  const { page, setPage } = useContext(GenreContext);

  let history = useHistory();

  useEffect(() => {
    // movies of the specific genre
    fetch(`/movies/genre/${names}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length !== 0) {
          setMovies(data.data);
          setTotalPages(data.total_pages);
        } else {
          setMessage("No Results");
        }
      });
  }, [page]);

  if (!movies) {
    return <div>{message}</div>;
  }

  const nextHandle = () => {
    setPage(page + 1);
  };

  const prevHandle = () => {
    setPage(page - 1);
  };

  if (!movies) {
    return <>Loading...</>;
  }

  return (
    <>
      <Wrapper>
        <CategoriesWrapper>
          {movies.map((element, index) => {
            return (
              <div key={index}>
                <CategoryWrapper>
                  <Link to={`/movie/${element.id}`}>
                    <ElementWrap>
                      {element.poster_path ? (
                        <Element src={IMG_URI + element.poster_path}></Element>
                      ) : (
                        <ElementNot>Picture not found</ElementNot>
                      )}
                    </ElementWrap>
                    <InfoWrapper>
                      <ElementTitle>{element.title}</ElementTitle>
                      <ElementVote
                        style={
                          element.vote_average >= 8
                            ? { color: "green" }
                            : element.vote_average >= 5
                            ? { color: "yellow" }
                            : { color: "red" }
                        }
                      >
                        {element.vote_average}
                      </ElementVote>
                    </InfoWrapper>
                  </Link>
                </CategoryWrapper>
              </div>
            );
          })}
        </CategoriesWrapper>
        <Wrap>
          {page < 2 ? (
            <Prev disabled onClick={prevHandle}>
              Previous Page
            </Prev>
          ) : (
            <Prev onClick={prevHandle}>Previous Page</Prev>
          )}
          <Page>{page}</Page>
          {page !== totalPages ? (
            <Next onClick={nextHandle}>Next Page</Next>
          ) : (
            <>
              <Next disabled onClick={nextHandle}>
                Next Page
              </Next>
              {/* <div>No Results</div> */}
            </>
          )}
        </Wrap>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div``;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 10px 30px; */
  background-color: #373b69;
  width: 100%;
  /* padding: 20px; */
`;

const Prev = styled.button`
  padding: 20px;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;

  &:disabled {
    color: gray;
  }
`;

const Next = styled.button`
  padding: 20px;
  outline: none;
  border: none;
  background-color: transparent;
  color: white;
`;

const Page = styled.div`
  padding: 20px;
  border-radius: 50%;
  border: 5px solid lightblue;
  color: white;
  font-weight: bold;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  padding: 8px 16px;
`;

const CategoryWrapper = styled.div`
  /* display: flex; */
  margin: 16px;
  width: 300px;

  background-color: #7378c5;
`;

const ElementWrap = styled.div`
  width: 100%;
`;

const Element = styled.img`
  width: 300px;
  /* margin: 16px; */
`;

const ElementNot = styled.div``;

const ElementId = styled.div``;

const ElementTitle = styled.div``;

const ElementVote = styled.div`
  background-color: #373b69;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
`;

const Link = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
`;
