import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default function WelcomePage() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            color="primary.main"
            gutterBottom
          >
            Welcome to Our Amazing App!
          </Typography>
          <Typography variant="body1" color="secondary.main" gutterBottom>
            Discover a world of possibilities with our innovative app. Explore
            features, connect with others, and achieve your goals.
          </Typography>
          <Button variant="contained" color="primary">
            Explore Now
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
