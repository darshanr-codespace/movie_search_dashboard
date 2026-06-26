import { client } from "../config/db.js";

const getAnalytics = async (req, res) => {
  try {
    const moviesDB = client.db("moviesDB");
    const moviesCollection = moviesDB.collection("movies");
    const showsCollection = moviesDB.collection("tvShows");

    const [movies, shows] = await Promise.all([
      moviesCollection
        .find({}, {
          projection: {
            _id: 0,
            title: 1,
            poster_path: 1,
            genres: 1,
            release_year: 1,
            vote_average: 1,
          },
        })
        .toArray(),
      showsCollection
        .find({}, {
          projection: {
            _id: 0,
            name: 1,
            poster_path: 1,
            genres: 1,
            first_air_year: 1,
            vote_average: 1,
          },
        })
        .toArray(),
    ]);

    const totalMovies = movies.length;
    const totalShows = shows.length;
    const allRatings = [...movies, ...shows].map((item) => item.vote_average || 0);
    const averageRating = allRatings.length
      ? (allRatings.reduce((sum, value) => sum + value, 0) / allRatings.length).toFixed(1)
      : "0.0";

    const START_YEAR = 2020;
    const END_YEAR = 2023;
    const trendingTodayMovies = await moviesCollection.countDocuments({
      release_year: { $gte: START_YEAR, $lte: END_YEAR },
    });
    const trendingTodayShows = await showsCollection.countDocuments({
      first_air_year: { $gte: START_YEAR, $lte: END_YEAR },
    });
    const trendingToday = trendingTodayMovies + trendingTodayShows;

    const genreCounts = {};
    const addGenres = (genres) => {
      if (!genres) {
        return;
      }
      if (Array.isArray(genres)) {
        genres.forEach((genre) => {
          if (!genre) return;
          const key = genre.toString().trim();
          if (!key) return;
          genreCounts[key] = (genreCounts[key] || 0) + 1;
        });
      } else {
        const key = genres.toString().trim();
        if (key) {
          genreCounts[key] = (genreCounts[key] || 0) + 1;
        }
      }
    };

    movies.forEach((movie) => addGenres(movie.genres));
    shows.forEach((show) => addGenres(show.genres));

    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const topGenre = sortedGenres.length ? sortedGenres[0][0] : "N/A";

    const trendYears = [2020, 2021, 2022, 2023];
    const movieTrendMap = trendYears.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});
    const showTrendMap = trendYears.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});

    const genreTrendMap = {};
    const topGenres = sortedGenres.slice(0, 4).map(([label]) => label);
    topGenres.forEach((genre) => {
      genreTrendMap[genre] = trendYears.reduce((acc, year) => ({ ...acc, [year]: 0 }), {});
    });

    movies.forEach((movie) => {
      if (typeof movie.release_year === "number" && movie.release_year in movieTrendMap) {
        movieTrendMap[movie.release_year] += 1;
        if (Array.isArray(movie.genres)) {
          movie.genres.forEach((genre) => {
            if (topGenres.includes(genre) && movie.release_year in genreTrendMap[genre]) {
              genreTrendMap[genre][movie.release_year] += 1;
            }
          });
        }
      }
    });
    shows.forEach((show) => {
      if (typeof show.first_air_year === "number" && show.first_air_year in showTrendMap) {
        showTrendMap[show.first_air_year] += 1;
        if (Array.isArray(show.genres)) {
          show.genres.forEach((genre) => {
            if (topGenres.includes(genre) && show.first_air_year in genreTrendMap[genre]) {
              genreTrendMap[genre][show.first_air_year] += 1;
            }
          });
        }
      }
    });

    const trendSeries = [
      { label: "Movies", data: trendYears.map((year) => movieTrendMap[year]) },
      { label: "TV Shows", data: trendYears.map((year) => showTrendMap[year]) },
    ];
    const genreTrendSeries = topGenres.map((genre) => ({
      label: genre,
      data: trendYears.map((year) => genreTrendMap[genre][year] || 0),
    }));

    const ratingBuckets = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];
    const ratingLabels = ratingBuckets.map((value) => value.toFixed(1));
    const ratingCounts = ratingBuckets.map(() => 0);

    allRatings.forEach((rating) => {
      for (let index = ratingBuckets.length - 1; index >= 0; index -= 1) {
        if (rating >= ratingBuckets[index]) {
          ratingCounts[index] += 1;
          return;
        }
      }
    });

    const ratingSeries = [
      {
        label: "Title Count",
        data: ratingCounts,
      },
    ];

    const genreSeries = [
      {
        data: sortedGenres.map(([label, value]) => ({ value, label })),
      },
    ];

    const chartData = {
      summary: {
        totalMovies,
        totalShows,
        averageRating,
        trendingToday,
        topGenre,
        activeTrends: `${trendYears[0]}–${trendYears[trendYears.length - 1]}`,
      },
      trendLabels: trendYears.map(String),
      trendSeries,
      genreTrendLabels: trendYears.map(String),
      genreTrendSeries,
      ratingLabels,
      ratingSeries,
      genreSeries,
    };

    return res.json(chartData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};

export { getAnalytics };