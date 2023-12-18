import { useMutation } from "@apollo/client";
import styles from "../auth.module.scss";
import loginImg from "../assets/login.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gqloperation/mutation";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  if (loading) return <h1>Logged in.....</h1>;

  if (data) {
    localStorage.setItem("jwt", data.login.jwt);
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Do Not Refresh The Page
    loginUser({
      variables: {
        input: formData,
      },
    });
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      {error && <div className="card-panel red">{error.message}</div>}
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Email Or Username"
          name="identifier"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          name="password"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit" className="btn blue">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
