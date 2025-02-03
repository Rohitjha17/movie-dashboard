import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";
import { StarIcon } from "@heroicons/react/24/solid";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then((response) => setMovie(response.data));
  }, [id]);

  if (!movie) return <div className="text-center py-8">Loading...</div>;

  const imdbRating = movie.Ratings?.find(r => r.Source === "Internet Movie Database")?.Value;
  const metacriticRating = movie.Ratings?.find(r => r.Source === "Metacritic")?.Value;
  const rottenTomatoesRating = movie.Ratings?.find(r => r.Source === "Rotten Tomatoes")?.Value;

  const formatRating = (rating, source) => {
    if (!rating || rating === "N/A") return "N/A";
    
    if (source === "Internet Movie Database") {
      return rating.split('/')[0]; 
    }
    if (source === "Rotten Tomatoes") {
      return rating.replace('%', '');
    }
    return rating;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
            alt={movie.Title}
            className="w-full md:w-1/3 rounded-lg shadow-xl h-fit"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {movie.Title}
              </h1>
              {imdbRating && imdbRating !== "N/A" && (
                <div className="flex items-center bg-amber-100 dark:bg-amber-900 px-3 py-1 rounded-full">
                  <StarIcon className="h-5 w-5 text-amber-500 dark:text-amber-300" />
                  <span className="ml-1 text-amber-800 dark:text-amber-200 font-medium">
                    {formatRating(imdbRating, "Internet Movie Database")}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {movie.Year}
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                {movie.Runtime}
              </span>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                {movie.Genre}
              </span>
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              Directed by <span className="font-semibold">{movie.Director}</span>
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Plot</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {movie.Plot}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ratings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">IMDb</p>
                  <div className="flex items-center mt-2">
                    <StarIcon className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                    <span className="text-2xl font-bold ml-2 text-amber-600 dark:text-amber-400">
                      {formatRating(imdbRating, "Internet Movie Database") || "N/A"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/10</span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">Rotten Tomatoes</p>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {rottenTomatoesRating ? formatRating(rottenTomatoesRating, "Rotten Tomatoes") : "N/A"}
                    </span>
                    
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">Metacritic</p>
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {metacriticRating ? formatRating(metacriticRating, "Metacritic") : "N/A"}
                    </span>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ReviewForm movieId={id} movieTitle={movie.Title}/>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;