import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

import { logout } from "./redux/reducers/authReducer";

import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";

const App = () => {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("username");
    if (!loggedInUser) dispatch(logout());
  }, [dispatch]);

  return (
    <LoadingOverlay active={loading} spinner text="Loading...">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </LoadingOverlay>
  );
};

export default App;
