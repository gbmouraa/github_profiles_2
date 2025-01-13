import { useState } from "react";
import { AppContext } from "../../appContext";
import { useContext } from "react";
import "./form_style.scss";

const Form = () => {
  const { fetchUserData } = useContext(AppContext);
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData(userName);
  };

  return (
    <div className="form_wrapper">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="user-name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Search for any profile on github"
        />
      </form>
    </div>
  );
};

export { Form };
