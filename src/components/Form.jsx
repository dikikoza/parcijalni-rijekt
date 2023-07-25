import React, { useState } from "react";
import PropTypes from "prop-types";

const Form = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={handleChange}
        placeholder="github"
      />
      <button type="submit">klikni</button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
