import React from "react";
import "../styles/MovieCard.css";
import { routes } from "../api";
import { Link } from "react-router-dom";

export default function MovieCard({ movie, reference }) {
  const movieYear = movie.release_date ? movie.release_date.split("-")[0] : "";
  const movieTitleSlug = movie.title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-");

  const movieDetailsLink = `/movie/${movieTitleSlug}/${movie.id}`;
  return (
    <div className="movieCardWrapper" ref={reference}>
      <div className="imgWrapper">
        <Link to={movieDetailsLink}>
          <img
            className="movieCardImg"
            src={routes.POSTER_BASE_URL + movie.poster_path}
            alt={movieTitleSlug}
          />
        </Link>
      </div>
      <div className="movieCardInfo">
        <h1 className="movieTitle">
          {movie.title} <span>({movieYear})</span>
        </h1>
        <p className="movieInfo">
          <span>{movie.vote_average}</span> Vote Average
        </p>
      </div>
    </div>
  );
}
