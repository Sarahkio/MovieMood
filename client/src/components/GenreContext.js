import { createContext, useEffect, useState } from "react";
import React from "react";

export const GenreContext = createContext();

export const GenreProvider = ({ children }) => {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  const [error, setError] = useState("");

  useEffect(() => {
    // all the genres
    fetch("/movies/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.data);
        // console.log(data.data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <GenreContext.Provider
      value={{
        genres,
        setGenres,
        page,
        setPage,
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};
