import React, { useEffect } from "react";
import { Box, Button, Chip, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Details({ details }) {
  const [data, setData] = useState({});
  const [movieId, setMovieId] = useState("");
  const navigate = useNavigate();

  const posterUrl = details.poster_path
    ? `https://image.tmdb.org/t/p/w1280${details.poster_path}`
    : "https://via.placeholder.com/500x280?text=No+Image";

  const backdropUrl = details.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${details.backdrop_path}`
    : "https://via.placeholder.com/500x280?text=No+Image";

  useEffect(() => {
    document.title = "Movie Stats | Details";
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100vh", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            backgroundImage:
              "linear-gradient(to bottom,transparent,#1414146d,#141414)",
          }}
        ></Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: `30%`,
          left: "0",
          right: "0",
          bottom: "0",
          background: "background.default",
          zIndex: "99999",
        }}
      >
        <Container>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            <img
              src={posterUrl}
              style={{
                height: "300px",
                width: "200px",
                objectFit: "cover",
                borderRadius: "1rem",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Chip label={details.genres} sx={{mb:'1rem'}}/>
                <Typography variant="h1">
                  {details.title ?? details.name}
                </Typography>
                <Typography>{details.tagline}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button variant="contained">Watch Trailer</Button>
                <Button variant="outlined">+ Add to LIbrary</Button>
              </Box>
            </Box>
          </Box>
          <Paper sx={{p:'2rem',mt:'1rem', border:'1px solid text.primary'}}>
            {details.overview}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Details;
