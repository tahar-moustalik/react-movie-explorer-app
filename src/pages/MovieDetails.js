import React from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieDetails, routes, useFetchMovieCast } from "../api";
import Loader from "react-loader-spinner";
import "../styles/MovieDetails.css";
import { languages } from "../languages";
import { CastList } from "../components";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieDetails() {
  const { movieId } = useParams();
  const { movie, loadingMovie } = useFetchMovieDetails(movieId);
  const { cast, loadingCast } = useFetchMovieCast(movieId);
  return (
    <AnimatePresence>
      <motion.div
        className="movieDetailsWrapper"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        {loadingMovie ? (
          <Loader
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
            style={{ margin: "auto" }}
          />
        ) : (
          <div className="movieDetailsInfo">
            <div className="left-col">
              <img
                src={routes.BACKDROP_BASE_URL + movie.backdrop_path}
                className="movieDetailsImg"
                alt={movie.title}
              />
              <div className="footer">
                <h1 className="movieDetailsTitle">{movie.title}</h1>
                <h3 className="movieDetailsCount">{movie.vote_count} Votes</h3>
                <h3 className="movieDetailsVoteAverage">
                  {movie.vote_average} Vote Average
                </h3>
              </div>

              <div className="footer-2">
                <div>
                  <h1 className="movieDetailsTitle">Budget</h1>
                  <p className="movieDetailsInfoDescription">
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(movie.budget)}
                  </p>
                </div>
                <div>
                  <h1 className="movieDetailsTitle">Language</h1>
                  <p className="movieDetailsInfoDescription">
                    {languages[movie.original_language].name}
                  </p>
                </div>
                <div>
                  <h1 className="movieDetailsTitle">Country</h1>
                  <p className="movieDetailsInfoDescription">United States</p>
                </div>
                <div>
                  <h1 className="movieDetailsTitle">Runtime</h1>
                  <p className="movieDetailsInfoDescription">
                    {movie.runtime} Minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="right-col">
              <h1 className="movieDetailsTitle">Storyline</h1>
              <p className="movieDetailsInfoDescription">{movie.overview}</p>

              <h1 className="movieDetailsTitle">Genres</h1>
              <p className="movieDetailsInfoDescription">
                {movie.genres.map((genre, index) => {
                  if (index + 1 === movie.genres.length) {
                    return genre.name + " ";
                  } else {
                    return genre.name + " , ";
                  }
                })}
              </p>
            </div>
          </div>
        )}
        <div className="movieAdditionalInfo">
          {loadingCast ? (
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
              style={{ margin: "auto" }}
            />
          ) : (
            <CastList results={cast} />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
