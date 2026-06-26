import React, { useEffect, useState } from 'react'
import { Box, Typography, Paper, Grid, Stack, Chip } from '@mui/material'
import { LineChart } from '@mui/x-charts/LineChart'
import { BarChart } from '@mui/x-charts/BarChart'
import { PieChart } from '@mui/x-charts/PieChart'

const initialChartData = {
  summary: {
    totalMovies: '0',
    totalShows: '0',
    averageRating: '0.0',
    topGenre: 'N/A',
  },
  trendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  trendSeries: [
    { label: 'Movies', data: [72, 84, 90, 105, 112, 123], curve: 'monotoneX' },
    { label: 'TV Shows', data: [58, 68, 75, 83, 95, 108], curve: 'monotoneX' },
  ],
  ratingLabels: ['6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0'],
  ratingSeries: [
    {
      label: 'Title Count',
      data: [12, 24, 38, 52, 65, 48, 31],
    },
  ],
  genreSeries: [
    {
      data: [
        { value: 36, label: 'Action' },
        { value: 24, label: 'Drama' },
        { value: 18, label: 'Sci-Fi' },
        { value: 12, label: 'Thriller' },
        { value: 10, label: 'Fantasy' },
      ],
    },
  ],
}

function Charts() {
  useEffect(() => {
    document.title = "Movie Stats | Analytics";
  }, []);

  const [chartData, setChartData] = useState(initialChartData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const response = await fetch('/api/analytics')
        if (!response.ok) {
          throw new Error(`Failed to load analytics: ${response.status}`)
        }
        const data = await response.json()
        setChartData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const { summary, trendLabels, trendSeries, ratingLabels, ratingSeries, genreSeries } = chartData
  const summaryStats = [
    { label: 'Total Movies', value: summary.totalMovies },
    { label: 'TV Series', value: summary.totalShows },
    { label: 'Average Rating', value: summary.averageRating },
    { label: 'Top Genre', value: summary.topGenre },
  ]

  if (loading) {
    return (
      <Box sx={{ p: 4, color: 'text.primary' }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Analytics Dashboard
        </Typography>
        <Typography>Loading analytics data…</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, color: 'text.primary', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {summaryStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper sx={{ p: 3, minHeight: 120, bgcolor: 'background.paper' }}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                {stat.label}
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {error ? (
        <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
          <Typography variant="h6" sx={{ color: 'error.main' }}>
            Failed to load analytics
          </Typography>
          <Typography>{error}</Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Movies vs TV Popularity
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Yearly title growth comparison across the last six years.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Chip label="Movies" color="primary" />
                  <Chip label="TV Shows" color="secondary" />
                </Stack>
              </Box>
              <LineChart
                xAxis={[{ scaleType: 'point', data: trendLabels }]}
                series={trendSeries}
                height={320}
                sx={{ '& .MuiLineElement-root': { strokeWidth: 3 } }}
                showToolbar
              />
            </Paper>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper', height: '100%' }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Genre Distribution
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Share of titles by genre within the current catalog.
                </Typography>
              </Box>
              <PieChart
                series={genreSeries}
                height={320}
                sx={{ '& .MuiChartsLegend-root': { mt: 2 } }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Rating Distribution
              </Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ratingLabels }]}
                series={ratingSeries}
                height={320}
                grid={{ vertical: false, horizontal: true }}
                showToolbar
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={6}>
            <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Growth Snapshot
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Projected growth and recent momentum for content additions.
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">New releases added</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>42</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">Average rating uplift</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>+0.4</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle2">Viewer retention</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>92%</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default Charts
