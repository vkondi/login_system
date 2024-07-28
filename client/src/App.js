import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

import {
  logout,
  setUserDetails,
  showLoader,
  hideLoader,
} from "./redux/reducers/authReducer";
import { LS_USERNAME_KEY } from "./utils/Constants";
import { GET_USER_URL } from "./utils/Paths";
import axios from "./services/axiosConfig";

import Header from "./components/common/Header";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";

const App = () => {
  const loggedInUser = localStorage.getItem(LS_USERNAME_KEY);

  const { loading, authenticated, username } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(
    async (loggedInUser) => {
      if (!loggedInUser) return;

      dispatch(showLoader());

      const response = await axios.get(`${GET_USER_URL}/${loggedInUser}`);

      dispatch(hideLoader());

      if (response.data.status === "success") {
        dispatch(
          setUserDetails({
            username: response.data.data?.username,
            name: response.data.data?.name,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (!loggedInUser) dispatch(logout());
  }, [dispatch, loggedInUser]);

  // Fetch user details once logged in
  useEffect(() => {
    if (authenticated && !username) {
      fetchUserDetails(loggedInUser);
    }
  }, [authenticated, fetchUserDetails, username, loggedInUser]);

  return (
    <LoadingOverlay active={loading} spinner text="Loading...">
      <Router>
        <Header />
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
