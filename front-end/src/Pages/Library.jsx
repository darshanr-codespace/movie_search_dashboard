import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

function Library() {
  const [useCollection, setUserCollection] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w1280";
  useEffect(() => {
    document.title = "Movie Stats | Library";
  }, []);

  useEffect(() => {
    async function getUserCollection() {
      try {
        const token = window.localStorage.getItem("authToken");
        if (!token) {
          window.location.href = "/login";
          return;
        }
        const res = await fetch("/api/user/collection", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        console.log("User collection data:", data);
        setUserCollection(data.items || data);
      } catch (error) {
        console.error("Failed to load user collection:", error);
      }
    }

    getUserCollection();
  }, []);

  return (
    <Box sx={{ p: 4, color: "text.primary" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Library
      </Typography>
      <Grid container spacing={2}>
        {useCollection.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card
              sx={{ bgcolor: "background.paper" }}
              sx={{
                flex: "1",
                minWidth: 220,
                maxWidth: 280,
                width: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                minHeight: 460,
                height: "100%",
              }}
            >
              <CardMedia>
                <img src={BASE_URL + movie.poster_path} alt="poster img" />
              </CardMedia>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Year: {movie.release_year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Library;
