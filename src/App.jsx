import { useState } from "react";
import api from "./api";
import githubLogo from "./images/github.svg";

function App() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState();
  const [repos, setRepos] = useState();

  const fetchUserData = async () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <>
      <main>
        <div className="form_wrapper">
          <img src={githubLogo} alt="Github Logo" width={48} />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Search for any profile on github"
            />
          </form>
        </div>
        {userData ? (
          <div className="user_card_wrapper">
            <div className="user_card">
              <img
                src={userData.avatar_url}
                alt="User avatar"
                className="user_avatar"
              />
              <div className="user_details">
                <a href={userData.html_url} className="user_name">
                  {userData.name}
                </a>
                <div className="user_infos">
                  <span>{userData.followers} followers</span>
                  <span>{userData.following} following</span>
                  <span>{userData.public_repos} repos</span>
                </div>
                {repos ? (
                  <div>
                    {repos.map((item) => {
                      return (
                        <a key={item} href={item.html_url}>
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}

export default App;
