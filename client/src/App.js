import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!sessionStorage.getItem("user"));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <WelcomePage /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
