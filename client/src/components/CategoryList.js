import styled from "styled-components";

const CategoryList = ({ element }) => {
  switch (element) {
    case "Action":
      return " 😍";
    case "Adventure":
      return "😎";
    case "Animation":
      return "🤗";
    case "Comedy":
      return "🤪";
    case "Crime":
      return "🕵️‍♀️";
    case "Documentary":
      return "🤔";
    case "Drama":
      return "😂";
    case "Family":
      return <Gamepad size={50} />;
    case "Fantasy":
      return "🧛‍♂️";
    case "History":
      return <Gamepad size={50} />;
    case "Horror":
      return "😱";
    case "Music":
      return <Gamepad size={50} />;
    case "Mystery":
      return "🧐";
    case "Romance":
      return "😍";
    case "Science Fiction":
      return "👽";
    case "Tv Movie":
      return <Gamepad size={50} />;
    case "Thriller":
      return <Gamepad size={50} />;
    case "War":
      return <Gamepad size={50} />;
    case "Western":
      return "🤠";
    default:
      return <FaCircle />;
  }
};
export default CategoryList;
