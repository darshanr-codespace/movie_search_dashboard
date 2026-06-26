import { AppBar, Box, Typography, Button } from "@mui/material";
import SearchBar from "./SearchBar";
import { NavLink, useLocation } from "react-router-dom";

const topLinks = [
  { label: "Movies", to: "/dashboard/trending?type=movies" },
  { label: "TV Series", to: "/dashboard/trending?type=shows" },
];

function TopBar() {
  const location = useLocation();
  const searchType = new URLSearchParams(location.search).get("type")?.toLowerCase();

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${250}px)`, ml: `${250}px`, bgcolor: "background.default", py: "1rem" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mx: "10rem", alignItems: "center", gap: "5rem" }}>
        <SearchBar />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {topLinks.map((link) => {
            const active =
              link.label === "Movies"
                ? searchType === "movies"
                : searchType === "shows";
            return (
              <Button
                key={link.label}
                component={NavLink}
                to={link.to}
                end
                sx={{
                  color: active ? "secondary.main" : "text.primary",
                  textTransform: "none",
                  fontWeight: 700,
                  '&.active': {
                    color: "secondary.main",
                  },
                }}
              >
                {link.label}
              </Button>
            );
          })}
        </Box>
      </Box>
    </AppBar>
  );
}

export default TopBar;
