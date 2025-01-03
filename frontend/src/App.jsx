import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Favriote from "./pages/favriote";
import { useEffect, useState } from "react";

function App() {
  const [searchterm, setsearchterm] = useState("");
  const [movie, setMovie] = useState([]);

  const fetchMovie = async () => {
    if (searchterm.trim() === "") return; // Prevent API call with an empty search term
    try {
      let res = await fetch(
        `https://www.omdbapi.com/?s=${searchterm}&apikey=bd65d91`
      );
      let data = await res.json();
      setMovie(data.Search || []); // Handle cases where Search might be undefined
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="app">
        <div className="search-bar">
          <h1>Movie Library</h1>
          <input
            type="text"
            placeholder="Search Movies"
            value={searchterm}
            onChange={(e) => setsearchterm(e.target.value)}
          />
          <button onClick={fetchMovie}>Search</button>
        </div>

        <div className="movie-list">
          <div className="movies">
            {movie.map((items) => (
              <div className="movie-card" key={items.imdbID}>
                <img src={items.Poster} alt={items.Title} />
                <h3>{items.Title}</h3>
                <p>Year: {items.Year}</p>
                <button>Add To Favriote</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
