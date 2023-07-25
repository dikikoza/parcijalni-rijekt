import "./App.css";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import UserDetails from "./components/UserDetails.jsx";
import Form from "./components/Form";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = (username) => {
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then((userResponse) => userResponse.json())
      .then((user) => {
        fetch(`https://api.github.com/users/${username}/repos`)
          .then((reposResponse) => reposResponse.json())
          .then((repos) => {
            setUserData(user);
            setUserRepos(repos);
            setLoading(false);
            document.body.classList.add("loaded");
          })
          .catch((error) => {
            console.error("Error fetching user repositories:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  };

  const handleReset = () => {
    setUserData(null);
    setUserRepos([]);
    setLoading(false);
    document.body.classList.remove("loaded");
  };

  return (
    <div className={`container ${userData ? "show-results" : ""}`}>
      <div className="github-icon">
        <FaGithub />
      </div>
      {loading && (
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      )}
      {!userData ? (
        <Form onSubmit={handleSubmitForm} />
      ) : (
        <UserDetails user={userData} repos={userRepos} onReset={handleReset} />
      )}
    </div>
  );
};

export default App;
