import React, { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "your_omdb_api_key"; // Replace with your OMDb API key

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Fetch movies from OMDb API
  const fetchMovies = async () => {
    if (searchTerm.trim() === "") return;
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
    );
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  // Add movie to favorites
  const addToFavorites = (movie) => {
    const updatedFavorites = [...favorites, movie];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Remove movie from favorites
  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Check if movie is a favorite
  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  return (
    <div className="app">
      <h1>Movie Library</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchMovies}>Search</button>
      </div>
      <div className="movie-list">
        <h2>Search Results</h2>
        <div className="movies">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              {isFavorite(movie) ? (
                <button onClick={() => removeFromFavorites(movie)}>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(movie)}>
                  Add to Favorites
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="favorites">
        <h2>Favorites</h2>
        <div className="movies">
          {favorites.map((movie) => (
            <div className="movie-card" key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <button onClick={() => removeFromFavorites(movie)}>
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
