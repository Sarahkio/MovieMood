// import { createContext, useEffect, useState, useContext } from "react";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { GenreContext } from "./GenreContext";
// export const MovieContext = createContext();

// export const MovieProvider = ({ children }) => {
//   const [page, setPage] = useState(1);
//   const [movies, setMovies] = useState(null);
//   const [message, setMessage] = useState("");
//   const [totalPages, setTotalPages] = useState(null);
//   const { names } = useParams();
//   useEffect(() => {
//     // movies of the specific genre
//     fetch(`/movies/genre/${names}?page=${page}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.data.length !== 0) {
//           setMovies(data.data);
//           setTotalPages(data.total_pages);
//         } else {
//           setMessage("No Results");
//         }
//       });
//   }, [page]);
//   return (
//     <MovieContext.Provider
//       value={{
//         page,
//         setPage,
//         movies,
//         setMovies,
//         message,
//         setMessage,
//         totalPages,
//         setTotalPages,
//       }}
//     >
//       {children}
//     </MovieContext.Provider>
//   );
// };
