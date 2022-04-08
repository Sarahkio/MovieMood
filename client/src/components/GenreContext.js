import { createContext, useEffect, useState } from "react";
import React from "react";

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  // const [movies, setMovies] = useState(null);
  // const [message, setMessage] = useState("");
  // const [totalPages, setTotalPages] = useState(null);
  // const { names } = useParams();
  const [error, setError] = useState("");

  //   const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    // all the genres
    fetch("/movies/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  // useEffect(() => {
  //   // movies of the specific genre
  //   fetch(`/movies/genre/${names}?page=${page}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.data.length !== 0) {
  //         setMovies(data.data);
  //         setTotalPages(data.total_pages);
  //       } else {
  //         setMessage("No Results");
  //       }
  //     })
  //     .catch((err) => {
  //       setError(err);
  //     });
  // }, [page]);

  return (
    <GenreContext.Provider
      value={{
        genres,
        setGenres,
        page,
        setPage,
        // movies,
        // setMovies,
        // message,
        // setMessage,
        // totalPages,
        // setTotalPages,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};
