import { useState } from "react";
import { AppContext } from "./appContext";
import api from "./api";

// eslint-disable-next-line
export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [repos, setRepos] = useState();

  const fetchUserData = async (userName) => {
    await api.get(userName).then((response) => {
      setUserData(response.data);
      fetchRepos(userName);
    });
  };

  const fetchRepos = async (user) => {
    await api.get(`${user}/repos?sort=created`).then((response) => {
      setRepos(() => {
        return response.data.slice(0, 5);
      });
    });
  };

  return (
    <AppContext.Provider
      value={{
        fetchUserData,
        fetchRepos,
        userData,
        repos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
