import React from "react";
import { useState, useEffect } from "react";
import { auth, registerWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import login from "../Assets/images/loginPageIcon.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) {
      alert("UserName Field Should Not Be Empty");
    }
    if (!password) {
      alert("Password Field Should Not Be Empty");
    }
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    console.log("register useffect called");
    if (loading) {
      return <CircularProgress />;
    }
    if (user) {
      history.push("/");
    }
  }, [user, loading]);
  return (
    <div className="register-wrapper">
      <div className="fileds-container">
        <div className="logo-container">
          <img src={login} alt="logoHere" />
        </div>
        <div>
          <form action="">
            <div className="name-field">
              <input
                type="text"
                value={name}
                placeholder="username"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="email-field">
              <input
                type="email"
                value={email}
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pass-field">
              <input
                type="password"
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="register-button">
            <button onClick={register}>Register</button>
          </div>
          <div className="bottom-text">
            Already have an account??
            <Link to="/login" style={{ color: "#bb0f2f", paddingLeft: "10px" }}>
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
