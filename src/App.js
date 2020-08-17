import React, { useState } from "react";
import { Home } from "./pages";
import "./App.css";
import { NavBar } from "./components";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import { createBrowserHistory as history } from "history";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  function colorScheme() {
    const currentTheme = darkMode;
    setDarkMode(!currentTheme);
  }
  return (
    <Router history={history}>
      <div className={darkMode ? "darkMode" : "lightMode"}>
        <div className="container">
          <NavBar toggleColorScheme={colorScheme} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/movie/:movieTitle/:movieId"
              component={MovieDetails}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
