import { client } from "../config/db.js";

const getAllData = async (req, res) => {
  const moviesDB = client.db("moviesDB");
  // aggregate must be called on a collection
  const movies = await moviesDB
    .collection("movies")
    .aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          poster_path: 1,
          genres: 1,
          release_year: 1,
          vote_average: 1,
        },
      },
    ])
    .toArray();

  const tvShows = await moviesDB
    .collection("tvShows")
    .aggregate([
      {
        $project: {
          _id: 0,
          name:1,
          poster_path:1,
          vote_average:1,
          genres:1,
          first_air_year:1
        },
      },
    ])
    .toArray();

  const type = req.query.type?.toLowerCase();
  const genre = req.query.genre?.toLowerCase();

  if (type === "movies") {
    const data = genre
      ? movies.filter((movie) => {
          const g = Array.isArray(movie.genres)
            ? movie.genres.join(",")
            : movie.genres || "";
          return g.toLowerCase().includes(genre);
        })
      : movies;
    return res.json(data);
  }

  if (type === "tvshows" || type === "shows") {
    const data = genre
      ? tvShows.filter((tvShow) => {
          const g = Array.isArray(tvShow.genres)
            ? tvShow.genres.join(",")
            : tvShow.genres || "";
          return g.toLowerCase().includes(genre);
        })
      : tvShows;
    return res.json(data);
  }

  return res.json([...movies, ...tvShows]);
};

export { getAllData };
