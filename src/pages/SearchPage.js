import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY; 

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); 
  const [totalResults, setTotalResults] = useState(0); 
  const [moviesPerPage] = useState(10); 

  const searchMovies = async () => {
    if (!query.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let apiUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`;

      if (year) {
        apiUrl += `&y=${year}`;
      }

      if (type) {
        apiUrl += `&type=${type}`;
      }

      const response = await axios.get(apiUrl);

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults, 10));
      } else {
        setError(response.data.Error);
        setMovies([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    }

    setLoading(false);
  };

 
  useEffect(() => {
    if (query) {
      setMovies([]); 
      searchMovies();
    }
  }, [query, year, type, page]);


  const nextPage = () => {
    if (page * moviesPerPage < totalResults) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const totalPages = Math.ceil(totalResults / moviesPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Search Movies
      </h1>

  
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Enter movie title..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchMovies()}
          />

          <input
            type="text"
            placeholder="Year (e.g., 2020)"
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>

          <button
            onClick={searchMovies}
            className="bg-blue-500 text-white px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>


      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}


      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>


      {!loading && movies.length === 0 && !error && (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
          No movies found. Try a different search.
        </div>
      )}

      {totalResults > moviesPerPage && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            Previous
          </button>
          <div className="text-center">
            Page {page} of {totalPages}
          </div>
          <button
            onClick={nextPage}
            disabled={page * moviesPerPage >= totalResults}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
