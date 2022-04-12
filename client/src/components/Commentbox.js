import { useCallback, useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";

const Commentbox = ({ rows, cols, value, limit, id, title }) => {
  const { setUpdate, update, currentUser } = useContext(CurrentUserContext);
  //   const [content, setContent] = useState(value.slice(0, limit));
  const [content, setContent] = useState(null);

  //   console.log(id);

  //   const setFormattedContent = useCallback(
  //     (text) => {
  //       setContent(text.slice(0, limit));
  //     },
  //     [limit, setContent]
  //   );

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

  //   let limitContent = 280 - content.length;

  return (
    <Wrapper>
      <Textarea
        rows={rows}
        placeholder="What's Happening?"
        cols={cols}
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <NumButtonWrapper>
        <p
        //   style={
        //     limitContent < 0
        //       ? { color: "red" }
        //       : limitContent <= 55
        //       ? { color: "yellow" }
        //       : null
        //   }
        >
          {/* {limitContent} */}
        </p>
        <Button onClick={handlePostCreation}>
          {/* disabled={limitContent < 0}  */}
          Submit
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
  width: 750px;
  height: 50px;
  /* padding-top: 0px; */
  /* position: relative; */
  ::placeholder {
    position: absolute;
    align-items: center;
  }
  width: 700px;
  height: 200px;
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
