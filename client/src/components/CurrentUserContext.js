import { createContext, useEffect, useState } from "react";
import React from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // using it login
  const [users, setUsers] = useState([]); // array of users
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [update, setUpdate] = React.useState(false);

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));

    if (userObj) {
      fetch(`/user/${userObj}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data.data);
          setStatus("loaded");
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        status,
        setStatus,
        error,
        setError,
        update,
        setUpdate,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
