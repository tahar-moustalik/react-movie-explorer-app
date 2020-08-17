import React from "react";
import "../styles/MovieList.css";
import MovieCard from "./MovieCard";

export default function MovieList({ results, reference }) {
  return (
    <div className="movieList">
      {results
        .filter((movie) => movie.poster_path !== null)
        .map((movie, index) => {
          if (results.length === index + 1) {
            return (
              <MovieCard movie={movie} key={movie.id} reference={reference} />
            );
          } else {
            return (
              <MovieCard movie={movie} key={movie.id} reference={reference} />
            );
          }
        })}
    </div>
  );
}
