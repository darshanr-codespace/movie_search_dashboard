import { client } from "../config/db.js";

const getTrendingShows = async (req, res) => {
  try {
    const moviesDB = client.db("moviesDB");
    const tvShows = await moviesDB
      .collection("tvShows")
      .aggregate([
        {$match:{first_air_year:{$gt:2020}}},
        { $limit: 4 },
        {
          $project: {
            _id: 0,
            name: 1,
            poster_path: 1,
            vote_average: 1,
            genres: 1,
            first_air_year: 1,
          },
        },
      ])
      .toArray();
    res.json(tvShows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch trending tv Shows" });
  }
};

export { getTrendingShows };
