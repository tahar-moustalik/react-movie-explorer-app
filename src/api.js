import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/";

export const routes = {
  POSTER_BASE_URL: "https://image.tmdb.org/t/p/w500",
  BACKDROP_BASE_URL: "https://image.tmdb.org/t/p/w1280",
  FIRST_PAGE: 1,
  POST_PER_PAGE: 6,
  POPULAR_MOVIES_URL: BASE_URL + "movie/popular?api_key=" + API_KEY,
  SEARCH_MOVIES_URL: BASE_URL + "search/movie?api_key=" + API_KEY,
  MOVIE_DETAILS_URL: BASE_URL + "movie/",
};

export const useFetchPopularMovies = (popularMoviePageNumber) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [hasMorePopular, setHasMorePopular] = useState(false);

  useEffect(() => {
    setLoadingPopular(true);
    const source = axios.CancelToken.source();
    axios
      .get(routes.POPULAR_MOVIES_URL + "&page=" + popularMoviePageNumber, {
        cancelToken: source.token,
      })
      .then(function (response) {
        setPopularMovies((prevData) => {
          return [...new Set([...prevData, ...response.data.results])];
        });
        setHasMorePopular(popularMoviePageNumber <= response.data.total_pages);
      })
      .catch(function (error) {})
      .then(function () {
        // always executed
        setLoadingPopular(false);
      });

    return () => {
      source.cancel("Component got unmounted");
    };
  }, [popularMoviePageNumber]);
  return { loadingPopular, popularMovies, hasMorePopular };
};

export const useFetchSearchedMovies = (searchedMoviePageNumber, query) => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loadingSearched, setLoadingSearched] = useState(true);
  const [hasMoreSearched, setHasMoreSearched] = useState(false);

  useEffect(() => {
    setSearchedMovies([]);
  }, [query]);
  useEffect(() => {
    setLoadingSearched(true);
    const source = axios.CancelToken.source();
    if (query !== "") {
      axios
        .get(
          routes.SEARCH_MOVIES_URL +
            "&page=" +
            searchedMoviePageNumber +
            "&query=" +
            query,
          {
            cancelToken: source.token,
          }
        )
        .then(function (response) {
          setSearchedMovies((prevData) => {
            return [...new Set([...prevData, ...response.data.results])];
          });
          setHasMoreSearched(
            searchedMoviePageNumber <= response.data.total_pages
          );
        })
        .catch(function (error) {
          setSearchedMovies([]);
        })
        .then(function () {
          // always executed
          setLoadingSearched(false);
        });
    }
    return () => {
      source.cancel("Component got unmounted");
    };
  }, [searchedMoviePageNumber, query]);
  return { loadingSearched, searchedMovies, hasMoreSearched, query };
};

export const useFetchMovieDetails = (movieId) => {
  const [movie, setMovie] = useState({});
  const [loadingMovie, setLoadingMovie] = useState(true);

  useEffect(() => {
    setLoadingMovie(true);
    const source = axios.CancelToken.source();
    axios
      .get(routes.MOVIE_DETAILS_URL + movieId + "?api_key=" + API_KEY, {
        cancelToken: source.token,
      })
      .then(function (response) {
        setMovie(response.data);
      })
      .catch(function (error) {})
      .then(function () {
        setLoadingMovie(false);
      });

    return () => {
      source.cancel("Component got unmounted");
    };
  }, [movieId]);
  return { loadingMovie, movie };
};

export const useFetchMovieCast = (movieId) => {
  const [cast, setCast] = useState({});
  const [loadingCast, setLoadingCast] = useState(true);

  useEffect(() => {
    setLoadingCast(true);
    const source = axios.CancelToken.source();
    axios
      .get(routes.MOVIE_DETAILS_URL + movieId + "/credits?api_key=" + API_KEY, {
        cancelToken: source.token,
      })
      .then(function (response) {
        setCast(response.data.cast);
      })
      .catch(function (error) {})
      .then(function () {
        setLoadingCast(false);
      });
  }, [movieId]);
  return { loadingCast, cast };
};
