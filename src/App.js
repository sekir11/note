import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./Home";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsAuth={setIsAuth}></Login>}></Route>
        <Route path="/home" element={<Home isAuth={isAuth}></Home>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
