import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useState } from "react";

function Details() {
  const [data, setData] = useState({});
  const [movieId, setMovieId] = useState('')

  useEffect(() => {
    document.title = "Movie Stats | Details";
  }, []);

  return (
    <Box>
      hi
    </Box>
  );
}

export default Details;
