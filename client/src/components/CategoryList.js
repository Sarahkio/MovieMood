const CategoryList = ({ element }) => {
  switch (element.name) {
    case "Action":
      return "ðĪĐ";
    case "Adventure":
      return "ð";
    case "Animation":
      return "ðĪ";
    case "Comedy":
      return "ðĪŠ";
    case "Crime":
      return "ðĩïļââïļ";
    case "Documentary":
      return "ðĪ";
    case "Drama":
      return "ð­";
    case "Family":
      return "ðĻâðĐâðĶ";
    case "Fantasy":
      return "ð§ââïļ";
    case "History":
      return "ð";
    case "Horror":
      return "ðą";
    case "Music":
      return "ðđ";
    case "Mystery":
      return "ð§";
    case "Romance":
      return "ð";
    case "Science Fiction":
      return "ð―";
    case "Tv Movie":
      return "ðŽ";
    case "Thriller":
      return "ðĻ";
    case "War":
      return "ðĪŊ";
    case "Western":
      return "ðĪ ";
    default:
      return "ðŽ";
  }
};
export default CategoryList;
