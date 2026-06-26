import React, { useEffect } from 'react'
import { Box, Typography, Grid, Card, CardContent } from '@mui/material'

function Library() {
  useEffect(() => {
    document.title = "Movie Stats | Library";
  }, []);

  const libraryMovies = [
    { id: 1, title: 'Saved Movie 1', year: 2023 },
    { id: 2, title: 'Saved Movie 2', year: 2022 },
    { id: 3, title: 'Saved Movie 3', year: 2021 },
  ]
  return (
    <Box sx={{ p: 4, color: 'text.primary' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>My Library</Typography>
      <Grid container spacing={2}>
        {libraryMovies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ bgcolor: 'background.paper' }}>
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="text.secondary">Year: {movie.year}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Library
