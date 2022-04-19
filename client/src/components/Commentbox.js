import { useCallback, useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { TiArrowDownOutline, TiArrowUpOutline } from "react-icons/ti";

const Commentbox = ({ rows, cols, value, limit, id, title }) => {
  const { setUpdate, update, currentUser } = useContext(CurrentUserContext);
  const [content, setContent] = useState(value.slice(0, limit));
  //   const [content, setContent] = useState(null);
  const [movieComment, setMovieComment] = useState(null);
  const [ratings, setRatings] = useState(0);
  const [status, setStatus] = useState("loading");

  const setFormattedContent = useCallback(
    (text) => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );

  const handlePostCreation = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // status: content,
        userName: currentUser.userName,
        comments: content,
        title: title,
        id: id,
        ratings: ratings,
      }),
    };

    fetch("/comments", requestOptions).then((response) => response.json());
    // setRatings(ratings + 1);
    // setRatings(ratings - 1);
    setContent("");
    setUpdate(!update);
  };

  const increaseRating = () => {
    if (ratings < 10) {
      setRatings(ratings + 1);
    }
  };

  const decreaseRating = () => {
    if (ratings > 1) {
      setRatings(ratings - 1);
    }
  };

  useEffect(() => {
    // movie comments
    // console.log(id);
    fetch(`/movie-comment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieComment(data.data);
        setStatus("loaded");
        console.log(data.data);
      });
  }, []);

  let limitContent = 280 - content.length;

  return (
    <>
      <Wrapper>
        <Textarea
          rows={rows}
          placeholder="Comment and Rate the movie"
          cols={cols}
          onChange={(e) => setFormattedContent(e.target.value)}
          value={content}
        />
        <WrapperArrow>
          <ArrowUp onClick={increaseRating}>
            <TiArrowUpOutline />
          </ArrowUp>
          <span>{ratings}</span>
          <ArrowDown onClick={decreaseRating}>
            <TiArrowDownOutline />
          </ArrowDown>
        </WrapperArrow>
        <NumButtonWrapper>
          <p
            style={
              limitContent < 0
                ? { color: "red" }
                : limitContent <= 55
                ? { color: "yellow" }
                : null
            }
          >
            {limitContent}
          </p>

          <Button
            disabled={limitContent < 0 || ratings < 1}
            onClick={handlePostCreation}
          >
            Send
          </Button>
        </NumButtonWrapper>
      </Wrapper>
    </>
  );
};

const NumButtonWrapper = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const WrapperTextArrow = styled.div`
  /* display: flex; */
  /* align-items: center; */
`;

const ArrowUp = styled.button`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  border: none;
  /* color: gray; */
  background-color: transparent;
`;

const ArrowDown = styled.button`
  display: flex;
  font-size: 20px;
  cursor: pointer;
  border: none;
  /* color: gray; */
  background-color: transparent;
`;

const WrapperArrow = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
  gap: 5px;
`;

const Textarea = styled.textarea`
  position: relative;
  width: 500px;
  height: 70px;
  resize: none;
  /* display: flex;
  flex-direction: column;
  align-items: flex-start; */
  /* padding-top: 0px; */
  /* position: relative; */
  /* ::placeholder {
    position: absolute;
    top: 0;
    left: 0;
  } */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  color: white;
  background-color: hsl(258deg, 100%, 50%);
  padding: 5px;
  border-radius: 20px;

  &:disabled {
    opacity: 0.5;
  }
`;

export default Commentbox;
