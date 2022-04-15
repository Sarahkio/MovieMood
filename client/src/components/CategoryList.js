import styled from "styled-components";

const CategoryList = ({ element }) => {
  switch (element.name) {
    case "Action":
      return "😍";
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
      return "🎭";
    case "Family":
      return "👨‍👩‍👦";
    case "Fantasy":
      return "🧛‍♂️";
    case "History":
      return "🌎";
    case "Horror":
      return "😱";
    case "Music":
      return "🎹";
    case "Mystery":
      return "🧐";
    case "Romance":
      return "😍";
    case "Science Fiction":
      return "👽";
    case "Tv Movie":
      return "🎬";
    case "Thriller":
      return "😨";
    case "War":
      return "🤯";
    case "Western":
      return "🤠";
    default:
      return "🎬";
  }
};
export default CategoryList;
