import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const loginInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate(`${process.env.PUBLIC_URL}/home`);
    });
  };

  return (
    <div className="login-box">
      <h1>Note Application</h1>
      <button onClick={loginInWithGoogle}>ログイン</button>
    </div>
  );
};

export default Login;
