import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GenreContext } from "./GenreContext";
import CategoryList from "./CategoryList";

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
  console.log(selectedGenres);

  let SelectedGenresString = selectedGenres.map((genre) => genre.id).join(",");
  if (!genres) {
    return <>loading...</>;
  }
  return (
    <>
      <Wrapper>
        <Title>What Are You In The Mood To Watch?</Title>
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
            <div>See Movies</div>
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

const LabelInput = styled.label`
  font-size: 20px;
  padding: 15px;
  margin: 5px;
  color: black;
  /* background-color: #373b69; */
  display: inline-block;
  /* cursor: pointer; */
  /* height: 220px; */
  /* width: 220px; */
  border-radius: 50px;
  /* display: flex; */
  /* margin-top: 5px; */
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  width: 1600px;
  /* justify-content: space-around; */
  /* padding-top: 20px; */
`;

const WrapperInput = styled.div``;

const CategoryListWrapper = styled.div`
  font-size: 100px;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  /* gap: 10px; */
  width: 80%;
  /* max-width: 750px; */
  /* height: 220px; */
  /* margin-bottom: 50px; */
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
  /* height: 220px; */
  /* width: 220px; */
  border-radius: 50px;
  /* display: flex; */
  /* margin-top: 5px; */
`;

const Link = styled(NavLink)`
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
`;
