import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import signup from "/images/landingimage/signup.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setFormData({
      ...formData,
    });
    navigate("/cart");
    setFormData("");
  };
  return (
    <div>
      <img src={signup} alt="" className="landingImg" />
      <div className="loginContainer">
        <h2 className="articleHeader">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="inputLabel">
            nom d'utilisateur:
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label htmlFor="email" className="inputLabel">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label htmlFor="password" className="inputLabel">
            mot de passe:
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label htmlFor="confirmPassword" className="inputLabel">
            confirmer le mot de passe:
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <button type="submit" className="linkmenu">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
