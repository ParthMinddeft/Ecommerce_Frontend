import React, { useState } from "react";
import styles from "../auth.module.scss";
import signupImg from "../assets/register.png";
import { useNavigate } from "react-router-dom";
import { SIGNUP_USER } from "../gqloperation/mutation";
import { useMutation } from "@apollo/client";
import Footer from "../components/footer/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [signupUser, { loading, error, data }] = useMutation(SIGNUP_USER);

  if (loading) return <h1>Signed in.....</h1>;

  if (data) {
    localStorage.setItem("jwt", data.register.jwt);
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Do Not Refresh The Page
    signupUser({
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
        <img src={signupImg} alt="Signup" width="400" />
      </div>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Your Username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
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
          Signup
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Signup;
