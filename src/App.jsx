import { useState } from "react";
import api from "./api";
import githubLogo from "./images/github.svg";

function App() {
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState();

  const loadUserData = async () => {
    await api.get(userName).then((response) => {
      setUserData(response.data);
      console.log(response.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadUserData();
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
          // <UserCard data={data}/>
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
              <div>
                <span>followers:{userData.followers}</span>
                <span>following:{userData.following}</span>
                <span>repos:{userData.public_repos}</span>
              </div>
              {/* Repositorios */}
              <div></div>
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
