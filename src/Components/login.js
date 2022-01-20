import React from "react";
import { useState, useEffect } from "react";
import { auth, signInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import login from "../Assets/images/loginPageIcon.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);

  const history = useHistory();
  useEffect(() => {
    if (loading) {
      return <CircularProgress />;
    }
    if (user) {
      history.push("/");
    }
  }, [user, loading]);

  return (
    <div className="login-wrapper">
      <div className="fields-container">
        <div className="logo-container">
          <img src={login} alt="logoHere" />
        </div>
        <div>
          <form action="">
            <div className="email-field">
              <input
                type="email"
                value={email}
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="passw-field">
              <input
                type="password"
                value={password}
                placeholder="******"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>
          <div className="login-button">
            <button onClick={() => signInWithEmailAndPassword(email, password)}>
              Login
            </button>
          </div>
          <div className="bottom-text">
            Don't have an account??
            <Link
              to="/register"
              style={{ color: "#bb0f2f", paddingLeft: "10px" }}
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
