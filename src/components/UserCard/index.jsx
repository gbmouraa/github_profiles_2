import { useContext } from "react";
import { AppContext } from "../../appContext";
import "./user_card_style.scss";

export const UserCard = () => {
  const { userData, repos } = useContext(AppContext);
  return (
    <>
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
                <div className="repos">
                  {repos.map((item, idx) => {
                    return (
                      <a key={idx} href={item.html_url}>
                        {item.name}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
