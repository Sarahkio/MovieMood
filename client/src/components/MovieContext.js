// import { createContext, useEffect, useState, useContext } from "react";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { GenreContext } from "./GenreContext";
// export const MovieContext = createContext();

// export const MovieProvider = ({ children }) => {
//   const [movies, setMovies] = useState(null);
//   const { names } = useParams();
//   const { page, setPage } = useContext(GenreContext);

//   let history = useHistory();

//   useEffect(() => {
//     // movies of the specific genre
//     fetch(`/movies/genre/${names}?page=${page}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.data.length !== 0) {
//           setMovies(data.data);
//         } else {
//           noResults();
//         }
//       });
//   }, [page]);

//   const noResults = () => {
//     history.push("/");
//   };

//   return (
//     <MovieContext.Provider
//       value={{
//         movies,
//         setMovies,
//       }}
//     >
//       {children}
//     </MovieContext.Provider>
//   );
// };
