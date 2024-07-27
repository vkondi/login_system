import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "../services/axiosConfig";
import { login, showLoader, hideLoader } from "../redux/reducers/authReducer";
import { LOGIN_URL, HOME_ROUTE } from "../utils/Paths";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(showLoader());

    const response = await axios.post(LOGIN_URL, {
      username,
      password,
    });

    dispatch(hideLoader());

    if (response.data.status === "success") {
      setMessage("Login success");
      setOpen(true);

      const respUsername = response.data.data.username;
      const respName = response.data.data.name;

      localStorage.setItem("username", respUsername);
      localStorage.setItem("name", respName);

      dispatch(
        login({
          username: respUsername,
          name: respName,
        })
      );

      navigate(HOME_ROUTE);
    } else {
      setMessage(response.data?.message ?? "Login failed");
      setOpen(true);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box p={4} border={1} borderRadius={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
        <Typography align="center" mt={2}>
          Don't have an account? <Link href="/register">Register</Link>
        </Typography>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
    </Box>
  );
};

export default Login;
