import { useCallback, useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";

const TweetBox = ({ rows, cols, value, limit }) => {
  const { setUpdate, update } = useContext(CurrentUserContext);
  const [content, setContent] = useState(value.slice(0, limit));

  const setFormattedContent = useCallback(
    (text) => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );

  const handleTweetCreation = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: content }),
    };

    fetch("/comments", requestOptions).then((response) => response.json());
    setContent("");
    setUpdate(!update);
  };

  let limitContent = 280 - content.length;

  return (
    <>
      <Textarea
        rows={rows}
        placeholder="What's Happening?"
        cols={cols}
        onChange={(event) => setFormattedContent(event.target.value)}
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
        <Button disabled={limitContent < 0} onClick={handleTweetCreation}>
          MEOW
        </Button>
      </NumButtonWrapper>
    </>
  );
};

const NumButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const Textarea = styled.input`
  position: relative;
  width: 750px;
  height: 100px;
  padding-top: 0px;
  position: relative;
  ::placeholder {
    position: absolute;
  }
  /* width: 700px;
  height: 200px; */
`;

const Button = styled.button`
  border: none;
  color: white;
  background-color: hsl(258deg, 100%, 50%);
  padding: 5px;
  border-radius: 20px;
`;

export default TweetBox;
