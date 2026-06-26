import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const currentType = new URLSearchParams(location.search).get("type");

  const handleSearch = () => {
    const trimmed = query.trim();
    const params = new URLSearchParams();
    if (currentType) params.set("type", currentType);
    if (trimmed) params.set("search", trimmed);
    const queryString = params.toString();
    navigate(`/dashboard/trending${queryString ? `?${queryString}` : ""}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        border: "1px solid",
        flex: "2",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        position:'relative'
      }}
    >
      <InputBase
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search movies here"
        sx={{ px: 2 , color: "text.primary",height:'100%',width:'100%'}}
      />
      <IconButton onClick={handleSearch} sx={{ p: 1, color: "primary.main" ,position:'absolute',right:'0.5rem'}}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
