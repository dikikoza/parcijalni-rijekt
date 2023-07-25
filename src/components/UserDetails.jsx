import React from "react";
import PropTypes from "prop-types";

const UserDetails = ({ user, repos, onReset }) => {
  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <div className="user-details">
        <img src={user.avatar_url} alt="Profile" className="avatar" />
        <h2>{user.name}</h2>
        <p>{user.location || "nema lokacije"}</p>
        <p>{user.bio}</p>
      </div>

      {Array.isArray(repos) && repos.length > 0 ? (
        <div className="repos-list">
          <h3>Repositories:</h3>
          <ul>
            {repos.map((repo) => (
              <li key={repo.id}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Nije naslo.</p>
      )}

      <button onClick={onReset} className="reset-button">
        natrag
      </button>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  repos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      html_url: PropTypes.string,
    })
  ).isRequired,
  onReset: PropTypes.func.isRequired,
};

export default UserDetails;
