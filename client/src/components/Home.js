import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GenreContext } from "./GenreContext";
import CategoryList from "./CategoryList";
import pic from "../images/wallpaper.jpeg";

const Home = () => {
  const { genres, setGenres } = useContext(GenreContext);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreHandle = (checked, genre) => {
    if (checked) {
      // Add the genre
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    }
  };

  let SelectedGenresString = selectedGenres.map((genre) => genre.id).join(",");
  if (!genres) {
    return <>loading...</>;
  }
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>What Are You In The Mood To Watch?</Title>
        </TitleWrapper>
        <ImageWrapper>
          <ImageWall src={pic}></ImageWall>
        </ImageWrapper>
        <GenresWrapper>
          <PickGenre>Choose Your Genres Below...</PickGenre>
        </GenresWrapper>
        <CategoriesWrapper>
          {genres.map((element, index) => {
            return (
              <div key={index}>
                <CategoryWrapper>
                  <CategoryListWrapper>
                    <CategoryList element={element} />
                  </CategoryListWrapper>
                  <WrapperInput>
                    <InputElement
                      onChange={(ev) => genreHandle(ev.target.checked, element)}
                      type="checkbox"
                    ></InputElement>
                    <LabelInput style={{ Color: "blue" }}>
                      {element.name}
                    </LabelInput>
                  </WrapperInput>
                </CategoryWrapper>
              </div>
            );
          })}
          <Link to={`/movies/genre/${SelectedGenresString}?page=1`}>
            <SeeMovies>See Movies</SeeMovies>
          </Link>
        </CategoriesWrapper>
      </Wrapper>
    </>
  );
};

export default Home;

const InputElement = styled.input`
  cursor: pointer;
`;

const ImageWall = styled.img`
  width: 65%;
  max-height: fit-content;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: black;
`;

const SeeMovies = styled.div`
  color: white;
  background-color: orange;
  padding: 10px 15px;
  border-radius: 50px;
  margin: 5px;
`;

const PickGenre = styled.div`
  font-size: 30px;
  padding: 35px;
  font-weight: bold;
`;

const GenresWrapper = styled.div`
  display: flex;
  background-color: #7378c5;
  width: 100%;
  color: white;
  justify-content: center;
`;

const LabelInput = styled.label`
  font-size: 20px;
  padding: 15px;
  margin: 5px;
  color: white;
  display: inline-block;
  border-radius: 50px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
  padding: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: orange;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: #373b69;
`;

const WrapperInput = styled.div``;

const CategoryListWrapper = styled.div`
  font-size: 100px;
  color: white;
  background-color: orange;
  padding: 10px 15px;
  border-radius: 50%;
  margin: 5px;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: 80%;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Element = styled.div`
  font-size: 20px;
  padding: 10px 20px;
  margin: 5px;
  color: #fff;
  background-color: #373b69;
  display: inline-block;
  cursor: pointer;
  border-radius: 50px;
`;

const Link = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
`;
