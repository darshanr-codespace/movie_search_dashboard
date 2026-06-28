import { client } from "../config/db.js";

const getTrendingMovies = async (req, res) => {
  try {
    const moviesDB = client.db("moviesDB");
    const movies = await moviesDB
      .collection("movies")
      .aggregate([
          { $match: { release_year: {$gte:2023} } },
        {
          $project: {
            _id: 0,
            id:1,
            title: 1,
            poster_path: 1,
            genres: 1,
            release_year: 1,
            vote_average: 1,
          },
        },
        { $limit: 4 },
      ])
      .toArray();

    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

export { getTrendingMovies };
