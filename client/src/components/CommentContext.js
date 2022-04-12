// import { useContext } from "react";
// import { createContext, useState, useEffect } from "react";
// import { CurrentUserContext } from "./CurrentUserContext";

// export const CommentContext = createContext(null);

// export const CommentProvider = ({ children }) => {
//   const [movieId, setMovieId] = useState(null);
//   const [movieComment, setMovieComment] = useState(null);

//   useEffect(() => {
//     // movie comments
//     // console.log(id);
//     fetch(`/movie-comment/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setMovieComment(data.data);
//         console.log(data.data);
//       });
//   }, []);

//   return (
//     <CommentContext.Provider value={{ movieId, setMovieId }}>
//       {children}
//     </CommentContext.Provider>
//   );
// };

// export default CommentProvider;
