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
  const url = import.meta.env.VITE_PUBLIC_MENU_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      const body = { username, email, password };
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!response.ok) {
        alert(parseRes.message || "Signup failed");
        return;
      }
      console.log(parseRes.token);

      sessionStorage.setItem("token", parseRes.token);
      navigate("/cart");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <div>
      <img src={signup} alt="signupImg" loading="lazy" className="landingImg" />
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
