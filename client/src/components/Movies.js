import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { AiOutlinePicture } from "react-icons/ai";

import { useHistory } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState(null);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const { searchType, searchParams } = useParams();
  const IMG_URI = "https://image.tmdb.org/t/p/w500";
  const BASE_URI = "https://moovie-mood.herokuapp.com/";
  const [status, setStatus] = useState("loading");

  let history = useHistory();

  const page = Number(history.location.search.split("=")[1]);

  useEffect(() => {
    // movies of the specific genre
    if (searchType === "genre") {
      fetch(
        `https://moovie-mood.herokuapp.com/movies/genre/${searchParams}?page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length !== 0) {
            setMovies(data.data);
            setTotalPages(data.total_pages);
            setStatus("loaded");
            // setTotalPages(20);
          } else {
            setStatus("loaded");
            setMessage(
              <>
                <Face>🙁</Face> <div>No Result</div>
              </>
            );
          }
        });
    } else if (searchType === "title") {
      // console.log("title search");
      setStatus("loading");
      fetch(
        `https://moovie-mood.herokuapp.com/search/${searchParams}?page=${page}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data.length !== 0) {
            setMovies(data.data);
            setStatus("loaded");
            setTotalPages(data.total_pages);
            // setTotalPages(20);
          } else {
            setStatus("loaded");
            setMessage(
              <>
                <Face>🙁</Face> <div>No Result</div>
              </>
            );
          }
        });
    }
  }, [page, searchParams]);

  if (!movies) {
    return (
      <WrapperMessage>
        <Title>{message}</Title>
      </WrapperMessage>
    );
  }

  const nextHandle = () => {
    // setPage(page + 1);
    history.push(
      `https://moovie-mood.herokuapp.com/movies/genre/${searchParams}?page=${
        Number(page) + 1
      }`
    );
  };

  const prevHandle = () => {
    // setPage(page - 1);
    history.push(
      `https://moovie-mood.herokuapp.com/movies/genre/${searchParams}?page=${
        Number(page) - 1
      }`
    );
  };

  if (!movies) {
    return <>Loading...</>;
  }

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && movies && (
        <Wrapper>
          <CategoriesWrapper>
            {movies.map((element, index) => {
              return (
                <div key={index}>
                  <CategoryWrapper>
                    <Link to={`/movie/${element.id}`}>
                      <ElementWrap>
                        {element.poster_path ? (
                          <Element
                            src={IMG_URI + element.poster_path}
                          ></Element>
                        ) : (
                          <>
                            <Element
                              style={{ display: "none" }}
                              src={IMG_URI + element.poster_path}
                            ></Element>
                            <ElementNot>
                              <AiOutlinePicture size={300} />
                            </ElementNot>
                          </>
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
            {page < totalPages ? (
              <Next onClick={nextHandle}>Next Page</Next>
            ) : (
              <>
                <Next disabled onClick={nextHandle}>
                  Next Page
                </Next>
              </>
            )}
          </Wrap>
        </Wrapper>
      )}
    </>
  );
};

export default Home;

const Wrapper = styled.div``;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #373b69;
  width: 100%;
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

  &:disabled {
    color: gray;
  }
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

const WrapperMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`;

const Face = styled.div`
  font-size: 70px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
`;
