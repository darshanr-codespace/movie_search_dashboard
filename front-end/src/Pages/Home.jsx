import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TvIcon from "@mui/icons-material/Tv";
import StarIcon from "@mui/icons-material/Star";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { Link } from "react-router-dom";

function MediaCard({
  title,
  name,
  release_year,
  vote_average,
  genres,
  poster_path,
  first_air_year,
  id,
}) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x280?text=No+Image";
  return (
    <Card
      sx={{
        flex: "1",
        minWidth: 220,
        maxWidth: 280,
        display: "flex",
        position: "relative",
        flexDirection: "column",
        minHeight: 460,
        height: "100%",
        width: "100%",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexGrow: 1,
        }}
      >
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 5 }}>
          <IconButton
            size="small"
            onClick={async (e) => {
              e.stopPropagation();
              const token = window.localStorage.getItem('authToken');
              if (!token) return (window.location.href = '/login');
              const payload = { id, title: title ?? name, poster_path, genres, release_year: release_year ?? first_air_year };
              try {
                const res = await fetch('/api/user/collection', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error('Failed to save');
                // simple feedback
                console.log('Saved to collection');
              } catch (err) {
                console.error(err);
                alert('Save failed');
              }
            }}
            sx={{ bgcolor: 'background.paper' }}
          >
            <BookmarkAddIcon fontSize="small" />
          </IconButton>
        </Box>
        <CardMedia
          component="img"
          image={posterUrl}
          alt={title ?? name}
          sx={{ width: "100%", height: 280, objectFit: "cover" }}
        />
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Typography variant="h4" noWrap>
            {title ?? name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 0.5,
            }}
          >
            <Typography variant="body2">
              {release_year ?? first_air_year}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 12, color: "secondary.main" }} />
              <Typography variant="caption" sx={{ color: "text.primary" }}>
                {vote_average}
              </Typography>
            </Box>
          </Box>
          <Chip label={genres} size="small" sx={{ mt: 1 }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function Home() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [homeStats, setHomeStats] = useState({
    totalMovies: "0",
    totalShows: "0",
    trendingToday: "0",
    topGenre: "N/A",
  });
  const [genreTrend, setGenreTrend] = useState({ xAxis: [], series: [] });
  const [loadingHomeStats, setLoadingHomeStats] = useState(true);
  const [homeError, setHomeError] = useState(null);

  useEffect(() => {
    document.title = "Movie Stats | Home";
  }, []);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await fetch("/api/trending/movies");
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error(err);
      }
    }

    getMovies();
  }, []);

  useEffect(() => {
    async function getTvShows() {
      try {
        const res = await fetch("/api/trending/shows");
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setTvShows(data);
      } catch (err) {
        console.error(err);
      }
    }

    getTvShows();
  }, []);

  useEffect(() => {
    async function loadHomeAnalytics() {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        setHomeStats({
          totalMovies: data.summary.totalMovies?.toString() ?? "0",
          totalShows: data.summary.totalShows?.toString() ?? "0",
          trendingToday: data.summary.trendingToday?.toString() ?? "0",
          topGenre: data.summary.topGenre ?? "N/A",
        });
        const genreSeriesData = data.genreSeries?.[0]?.data || [];
        setGenreTrend({
          xAxis: genreSeriesData.map((item) => item.label),
          series: [
            {
              label: "Title count",
              data: genreSeriesData.map((item) => item.value),
            },
          ],
        });
      } catch (err) {
        console.error(err);
        setHomeError(err.message);
      } finally {
        setLoadingHomeStats(false);
      }
    }

    loadHomeAnalytics();
  }, []);

  return (
    <Box
      sx={{ width: "100%", bgcolor: "background.default", minHeight: "100vh" }}
    >
      <Box sx={{ p: "4rem" }}>
        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          {[
            {
              title: "Total Movies",
              value: homeStats.totalMovies,
              icon: LocalMoviesIcon,
            },
            { title: "TV Series", value: homeStats.totalShows, icon: TvIcon },
            {
              title: "2020–2023 Titles",
              value: homeStats.trendingToday,
              icon: TrendingUpIcon,
            },
            { title: "Top Genre", value: homeStats.topGenre, icon: StarIcon },
          ].map((data, index) => {
            const Icon = data.icon;
            return (
              <Card key={index} sx={{ flex: 1, minWidth: 200 }}>
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? "" : undefined}
                  sx={{
                    height: "100%",
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": { backgroundColor: "action.selected" },
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1,
                      }}
                    >
                      <Icon sx={{ color: "primary.main", fontSize: 28 }} />
                      {selectedCard === index && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "primary.main",
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{ color: "text.primary", mb: 0.5 }}
                    >
                      {data.value}
                    </Typography>
                    <Typography variant="body2">{data.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </Box>

        {/* Genre Trend Chart */}
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h3" sx={{ mb: 0.5 }}>
            Genre Trends (2020–2023)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Top database genres across the 2020 to 2023 period. Most popular
            genre: {homeStats.topGenre}.
          </Typography>
          <BarChart
            xAxis={[{ scaleType: "band", data: genreTrend.xAxis }]}
            series={genreTrend.series}
            height={340}
            sx={{
              "& .MuiChartsAxis-line": { stroke: "#2A2A2A" },
              "& .MuiChartsAxis-tick": { stroke: "#2A2A2A" },
              "& .MuiChartsAxis-tickLabel": { fill: "#808080" },
              "& .MuiChartsLegend-label": { fill: "#808080" },
            }}
            colors={["#E50914"]}
          />
        </Card>

        {/* Trending Movies */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 4,
                height: 24,
                bgcolor: "primary.main",
                borderRadius: 1,
              }}
            />
            <Typography variant="h3">Trending Movies</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
              <Grid container spacing={2}>
                {movies.map((movie, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i} sx={{ display: "flex" }}>
                    <Link to="/dashboard/details" style={{ width: "100%" }}>
                      <MediaCard {...movie} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
          </Box>
        </Box>

        {/* Trending TV Shows */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box
              sx={{
                width: 4,
                height: 24,
                bgcolor: "primary.main",
                borderRadius: 1,
              }}
            />
            <Typography variant="h3">Trending TV Shows</Typography>
          </Box>
          <Grid container spacing={2}>
            {tvShows.map((show, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i} sx={{ display: "flex" }}>
                <Link to="/dashboard/details">
                  <MediaCard {...show} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
