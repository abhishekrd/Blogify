import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const signinWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      localStorage.setItem("authenticated", true);
      setAuthenticated(true);
      navigate("/");
    });
  };
  return (
    <div className="loginpage">
      <p>Signin with Google to Continue</p>
      <button onClick={signinWithGoogle} className="login-btn">
        <img style={{ width: 22 }} src="/google-logo.png"></img>Signin with
        Google
      </button>
    </div>
  );
};

export default Login;
