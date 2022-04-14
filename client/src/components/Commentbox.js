import { useCallback, useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";

const Commentbox = ({ rows, cols, value, limit, id, title }) => {
  const { setUpdate, update, currentUser } = useContext(CurrentUserContext);
  const [content, setContent] = useState(value.slice(0, limit));
  //   const [content, setContent] = useState(null);
  const [movieComment, setMovieComment] = useState(null);

  // console.log(id);

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
      }),
    };

    fetch("/comments", requestOptions).then((response) => response.json());
    setContent("");
    setUpdate(!update);
  };

  useEffect(() => {
    // movie comments
    // console.log(id);
    fetch(`/movie-comment/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieComment(data.data);
        console.log(data.data);
      });
  }, []);

  let limitContent = 280 - content.length;

  return (
    <Wrapper>
      <Textarea
        rows={rows}
        placeholder="Comment and Rate the movie"
        cols={cols}
        onChange={(e) => setFormattedContent(e.target.value)}
        value={content}
      />
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
        <Button disabled={limitContent < 0} onClick={handlePostCreation}>
          {/* disabled={limitContent < 0}  */}
          Send
        </Button>
      </NumButtonWrapper>
    </Wrapper>
  );
};

const NumButtonWrapper = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const Textarea = styled.input`
  position: relative;
  width: 500px;
  height: 70px;
  /* padding-top: 0px; */
  /* position: relative; */
  ::placeholder {
    position: absolute;
    align-items: center;
  }
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
`;

export default Commentbox;
