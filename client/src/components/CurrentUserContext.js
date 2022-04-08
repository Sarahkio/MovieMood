import { createContext, useEffect, useState } from "react";
import React from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // using it login
  const [users, setUsers] = useState([]); // array of users
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));

    if (userObj) {
      setCurrentUser(userObj);
    }

    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setUsers(data.data);
        // setCurrentUser(data.data);
      })
      .catch((err) => {
        setError(err);
      });
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
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
