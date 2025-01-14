import { useState } from "react";
import { AppContext } from "./appContext";
import api from "./api";

// eslint-disable-next-line
export const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [repos, setRepos] = useState();
  const [loading, setLoading] = useState(false);
  const [badRequest, setBadRequest] = useState(false);

  const fetchUserData = async (userName) => {
    setBadRequest(false);
    setLoading(true);

    try {
      const response = await api.get(userName);
      setUserData(response.data);
      await fetchRepos(userName);
    } catch (error) {
      console.log(error);
      setBadRequest(true);
      setUserData(false);
    } finally {
      setLoading(false);
    }
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
        loading,
        badRequest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
