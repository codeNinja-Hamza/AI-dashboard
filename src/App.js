import Home from "./Components/home";
import Register from "./Components/register";
import Login from "./Components/login";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth } from "./Components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import loaderImg from "./Assets/images/loader.svg";

function App() {
  const [user, load] = useAuthState(auth);

  const loaderStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "250px",
    width: "400px",
    fontFamily: "poppins",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return !load ? (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute authed={user} path="/dashboard" component={Home} />
      </Switch>
    </div>
  ) : (
    <div style={loaderStyle}>
      Please wait... &nbsp;
      <img src={loaderImg} alt="loaderIcon" className="animation" />
    </div>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default App;
