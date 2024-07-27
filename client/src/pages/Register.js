import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "../services/axiosConfig";
import { showLoader, hideLoader } from "../redux/reducers/authReducer";
import { REGISTER_URL, LOGIN_ROUTE } from "../utils/Paths";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(showLoader());

      const response = await axios.post(REGISTER_URL, {
        username,
        password,
        name: fullName,
      });

      dispatch(hideLoader());

      if (response.data.status === "success") {
        setMessage("User registered successfully");
        setOpen(true);

        navigate(LOGIN_ROUTE);
      } else {
        setMessage(response.data?.error ?? "Failed to register user");
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoader());
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
    </Container>
  );
};

export default Register;
