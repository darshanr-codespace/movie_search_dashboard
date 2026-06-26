import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

const filters = ["All", "Movies", "TV Shows"];
const sortOptions = ["Trending", "IMDB Rating", "Newest", "Oldest"];
const genres = [
  "All Genres",
  "Sci-Fi",
  "Drama",
  "Action",
  "Thriller",
  "Horror",
  "Fantasy",
  "Historical",
];
const ITEMS_PER_PAGE = 8;

function MediaCard({
  title,
  name,
  release_year,
  vote_average,
  genres,
  poster_path,
  first_air_year,
  id,
  genre,
  rating,
  year,
}) {
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x280?text=No+Image";
  const cardTitle = title ?? name ?? "Untitled";
  const cardYear = release_year ?? first_air_year ?? year ?? "N/A";
  const cardRating = vote_average ?? rating ?? "N/A";
  const cardGenre = genres ?? genre ?? "Unknown";

  return (
    <Card
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
              const payload = { id, title: cardTitle, poster_path, genres: cardGenre, release_year: cardYear };
              try {
                const res = await fetch('/api/user/collection', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error('Failed to save');
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
          alt={cardTitle}
          sx={{ width: "100%", height: 280, objectFit: "cover" }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" noWrap>
            {cardTitle}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 0.5,
            }}
          >
            <Typography variant="body2">{cardYear}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 12, color: "secondary.main" }} />
              <Typography variant="caption" sx={{ color: "text.primary" }}>
                {cardRating}
              </Typography>
            </Box>
          </Box>
          <Chip label={cardGenre} size="small" sx={{ mt: 1 }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function Trending() {
  useEffect(() => {
    document.title = "Movie Stats | Trending";
  }, []);

  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("");
  const [activeGenre, setActiveGenre] = useState("All Genres");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const [allData, setAllData] = useState(null);
  const [query, setQuery] = useState({ type: null, genre: null });
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    async function getAllData() {
      try {
        const params = [];
        if (query.type) {
          const apiType = query.type === "shows" ? "tvshows" : query.type;
          params.push(`type=${apiType}`);
        }
        if (query.genre) params.push(`genre=${query.genre}`);
        const url = `/api/all${params.length ? `?${params.join("&")}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setAllData(data);
      } catch (err) {
        console.log(err);
        // fallback to static list when backend fails
        setAllData([]);
      }
    }

    getAllData();
  }, [query]);

  useEffect(() => {
    setQuery({
      type:
        activeFilter === "Movies"
          ? "movies"
          : activeFilter === "TV Shows"
          ? "shows"
          : null,
      genre: activeGenre === "All Genres" ? null : activeGenre.toLowerCase(),
    });
  }, [activeFilter, activeGenre]);

  const sourceData = allData !== null ? allData : [];
  const displayedData = sourceData.filter((item) => {
    if (!searchTerm) return true;
    const title = (item.title || item.name || "").toLowerCase();
    return title.includes(searchTerm);
  });

  const visible = displayedData.slice(0, visibleCount);
  const hasMore = visibleCount < displayedData.length;

  return (
    <Box sx={{ p: 4, bgcolor: "background.default", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <WhatshotIcon sx={{ color: "primary.main", fontSize: 28 }} />
        <Typography variant="h2">Trending Now</Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
        {filters.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            onClick={() => {
              setActiveFilter(filter);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            sx={{
              fontWeight: 700,
              cursor: "pointer",
              bgcolor:
                activeFilter === filter ? "primary.main" : "rgba(109,109,110,0.24)",
              color: activeFilter === filter ? "#fff" : "text.primary",
              border: "1px solid",
              borderColor: activeFilter === filter ? "primary.main" : "transparent",
            }}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        {genres.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            onClick={() => {
              setActiveGenre(genre);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.75rem",
              bgcolor: activeGenre === genre ? "rgba(229,9,20,0.18)" : "transparent",
              color: activeGenre === genre ? "primary.main" : "text.secondary",
              border: "1px solid",
              borderColor: activeGenre === genre ? "primary.main" : "divider",
            }}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 3, alignItems: "center", flexWrap: "wrap" }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Sort by:
        </Typography>
        {sortOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            onClick={() => setActiveSort(option)}
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.72rem",
              bgcolor: activeSort === option ? "background.paper" : "transparent",
              color: activeSort === option ? "text.primary" : "text.secondary",
              border: "1px solid",
              borderColor: activeSort === option ? "divider" : "transparent",
            }}
          />
        ))}
      </Stack>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Showing {visible.length} of {displayedData.length} titles
      </Typography>

      <Grid container spacing={2}>
        {visible.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{ display: "flex" }}>
            <Link to="/dashboard/details" style={{ width: "100%" }}>
              <MediaCard {...item} />
            </Link>
          </Grid>
        ))}
      </Grid>

      {hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Chip
            label={`Load More (${displayedData.length - visibleCount} remaining)`}
            onClick={() => setVisibleCount((count) => count + ITEMS_PER_PAGE)}
            sx={{
              px: 3,
              py: 2.5,
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: "pointer",
              bgcolor: "primary.main",
              color: "#fff",
              borderRadius: 1,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Trending;
