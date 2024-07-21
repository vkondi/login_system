import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log({ username, password, fullName });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
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
        <TextField
          label="Full Name"
          variant="outlined"
          margin="normal"
          fullWidth
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
