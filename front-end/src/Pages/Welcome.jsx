import React, { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";

function Welcome() {
  useEffect(() => {
    document.title = "Movie Stats | Welcome";
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(135deg, rgba(229, 9, 20, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="h1"
          sx={{
            mb: 3,
            fontWeight: 700,
            letterSpacing: 2,
            color: "primary.main",
          }}
        >
          WELCOME TO MOVIE STATS
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4, color: "text.secondary", fontWeight: 300 }}
        >
          Explore trends, analyze charts, and manage your movie library all in one place.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/dashboard/home"
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            href="/dashboard/trending"
          >
            View Trending
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Welcome;
