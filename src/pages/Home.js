import React, { useRef, useState, useCallback } from "react";
import { MovieSearchInput, MovieList } from "../components";
import { useFetchPopularMovies, useFetchSearchedMovies } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "react-loader-spinner";

export default function Home(props) {
  const [popularMoviePageNumber, setPopularMoviePageNumber] = useState(1);
  const [searchedMoviePageNumber, setSearchedMoviePageNumber] = useState(1);
  const [query, setQuery] = useState("");

  const {
    popularMovies,
    loadingPopular,
    hasMorePopular,
  } = useFetchPopularMovies(popularMoviePageNumber);

  const {
    searchedMovies,
    loadingSearched,
    hasMoreSearched,
  } = useFetchSearchedMovies(searchedMoviePageNumber, query);
  const popularMoviesObserver = useRef();
  const lastPopularMovieResultRef = useCallback(
    (node) => {
      if (loadingPopular) return;
      if (popularMoviesObserver.current)
        popularMoviesObserver.current.disconnect();
      popularMoviesObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePopular) {
          setPopularMoviePageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) popularMoviesObserver.current.observe(node);
    },
    [loadingPopular, hasMorePopular]
  );

  const searchedMoviesObserver = useRef();
  const lastSearchedMovieResultRef = useCallback(
    (node) => {
      if (loadingSearched) return;
      if (searchedMoviesObserver.current)
        searchedMoviesObserver.current.disconnect();
      searchedMoviesObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreSearched) {
          setSearchedMoviePageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) searchedMoviesObserver.current.observe(node);
    },
    [loadingSearched, hasMoreSearched]
  );

  function searchMovies(event) {
    console.info("query", event.target.value);

    setQuery(event.target.value);
    setSearchedMoviePageNumber(1);
  }

  function renderSearchedMoviesResults() {
    return (
      <MovieList
        results={searchedMovies}
        reference={lastSearchedMovieResultRef}
      />
    );
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        exit={{ opacity: 0 }}
      >
        <MovieSearchInput onSearch={searchMovies} searchValue={query} />
        {query === "" ? (
          <MovieList
            results={popularMovies}
            reference={lastPopularMovieResultRef}
          />
        ) : (
          renderSearchedMoviesResults()
        )}

        {(loadingPopular || loadingSearched) && (
          <Loader
            type="Rings"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
            style={{ margin: "auto" }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
