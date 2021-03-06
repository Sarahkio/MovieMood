import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Commentbox from "./Commentbox";
import { NavLink } from "react-router-dom";
import MovieDetailsComment from "./MovieDetailsComment";
import { AiOutlinePicture } from "react-icons/ai";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [status, setStatus] = useState("loading");
  const [movieCredits, setMovieCredits] = useState(null);

  const { id } = useParams();
  const BASE_URI = "https://moovie-mood.herokuapp.com/";

  const IMG_URI = "https://image.tmdb.org/t/p/w500";

  // const IMG2_URI = "https://image.tmdb.org/";

  useEffect(() => {
    // movie details
    fetch(`/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data.data);
        setStatus("loaded");
        // console.log(data.data);
      });
  }, [id]);

  useEffect(() => {
    // movie videos
    fetch(`/movies/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setMovieVideos(data.data.results);
          setStatus("loaded");
        }
      });
  }, [id]);

  useEffect(() => {
    // movie credits
    fetch(`/movies/credits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setMovieCredits(data.data.cast);
          setStatus("loaded");
        }
      });
  }, [id]);

  let history = useHistory();

  if (!movieDetails) {
    return <>Loading...</>;
  }

  return (
    <MainWrapper>
      {status === "loading" && <div>Loading...</div>}
      {status === "loaded" && movieDetails && (
        <Wrapper>
          <CategoriesWrapper>
            <ElementWrap>
              {movieDetails.poster_path ? (
                <Element src={IMG_URI + movieDetails.poster_path}></Element>
              ) : (
                <>
                  <Element
                    style={{ display: "none" }}
                    src={IMG_URI + movieDetails.poster_path}
                  ></Element>
                  <ElementNot>
                    <AiOutlinePicture size={600} />
                  </ElementNot>
                </>
              )}
            </ElementWrap>

            <WrapInfo>
              <TitleWrap>
                <ElementTitle>{movieDetails.original_title}</ElementTitle>
                <ElementVote
                  style={
                    movieDetails.vote_average >= 8
                      ? { color: "green" }
                      : movieDetails.vote_average >= 5
                      ? { color: "yellow" }
                      : { color: "red" }
                  }
                >
                  {movieDetails.vote_average}
                </ElementVote>
              </TitleWrap>

              <ElementId>
                <div>
                  <Genre>Genre: </Genre>
                  {movieDetails &&
                    movieDetails?.genres.map((el) => {
                      return el.name + " ";
                    })}{" "}
                </div>
              </ElementId>
              <OverviewWrap>
                {" "}
                <Overview>Overview: </Overview> {movieDetails.overview}
              </OverviewWrap>
              <CreditsWrap>
                <>
                  <Credits>Credits: </Credits>
                  {movieCredits &&
                    movieCredits?.map((credits) => {
                      if (credits.order <= 7) {
                        return (
                          <WrapperCredit>
                            <Name>{credits.original_name} </Name>
                            <Character>{credits.character}</Character>
                          </WrapperCredit>
                        );
                      }
                    })}
                </>
              </CreditsWrap>
              <VideosWrap>
                <>
                  <Trailers>Trailers: </Trailers>
                  {movieVideos &&
                    movieVideos?.map((videos) => {
                      if (videos.type === "Trailer") {
                        return (
                          <Video
                            target="_blank"
                            href={`https://www.youtube.com/watch?v=${videos.key}`}
                          >
                            {videos.name}
                          </Video>
                        );
                      }
                    })}
                </>
              </VideosWrap>
              <div>
                <Status>{movieDetails.status}:</Status>{" "}
                {movieDetails.release_date}
              </div>
              <div>
                <b>Tagline: </b>
                {movieDetails.tagline}
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  history.goBack();
                }}
              >
                Previous Page
              </Button>
            </WrapInfo>
          </CategoriesWrapper>
          <Commentbox
            limit={220}
            value=""
            id={id}
            title={movieDetails.original_title}
            poster={IMG_URI + movieDetails.poster_path}
          />
          {/* limit={300} value="" */}
          <WrapperComments>
            <WrapperCommentsUnerline>
              <Comments>Comments</Comments>
              <Underline></Underline>
            </WrapperCommentsUnerline>
            {status === "loading" && <div>Loading...</div>}
            {status === "loaded" && movieDetails && <MovieDetailsComment />}
          </WrapperComments>
        </Wrapper>
      )}
    </MainWrapper>
  );
};

export default MovieDetails;

const MainWrapper = styled.div`
  width: 670px;
  display: flex;
`;

const Wrapper = styled.div``;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
`;

const Trailers = styled.span`
  font-weight: bold;
`;

const Credits = styled.span`
  font-weight: bold;
`;

const VideosWrap = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CreditsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const WrapperCredit = styled.div`
  display: flex;
  gap: 10px;
`;

const Name = styled.span``;

const Character = styled.span`
  font-weight: 300;
`;

const Video = styled.a`
  color: blue;
  cursor: pointer;
`;

const Overview = styled.span`
  font-weight: bold;
`;

const OverviewWrap = styled.div`
  margin-bottom: 10px;
`;

const Status = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  border: none;
  color: white;
  background-color: hsl(258deg, 100%, 50%);
  padding: 5px;
  border-radius: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: fit-content;
  cursor: pointer;
`;

const Element = styled.img`
  margin-top: 15px;
  width: 600px;
  height: 700px;
`;

const ElementNot = styled.div`
  margin-top: 15px;
`;

const ElementId = styled.div`
  margin-bottom: 10px;
`;

const ElementTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const TitleWrap = styled.div`
  display: flex;
  /* gap: 100px; */
  /* flex-direction: row; */
  justify-content: space-evenly;
  align-items: center;
  /* margin: 16px; */
  width: 600px;

  background-color: #7378c5;
  margin-bottom: 10px;
  /* border: 2px solid yellow; */
`;

const Genre = styled.span`
  font-weight: bold;
`;

const ElementVote = styled.div`
  background-color: #373b69;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: bold;
`;

const ElementWrap = styled.div`
  display: flex;
  align-items: center;
`;

const WrapInfo = styled.div`
  flex: 33.33%;
`;

const WrapperCommentsUnerline = styled.div``;

const WrapperComments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  /* flex-wrap: wrap; */
  height: 800px;
`;

const Comments = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const Underline = styled.div`
  width: 200px;
  height: 2px;
  margin-top: 10px;
  background-color: black;
`;
