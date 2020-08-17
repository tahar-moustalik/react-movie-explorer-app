import React from "react";
import "../styles/CastList.css";
import { routes } from "../api";

const CastCard = ({ cast }) => {
  return (
    <div className="castCardWrapper">
      <div className="imgWrapper">
        <img
          className="castCardImg"
          src={routes.POSTER_BASE_URL + cast.profile_path}
          alt={cast.name}
        />
      </div>
      <div className="castCardInfo">
        <h1 className="castName">{cast.name}</h1>
        <p className="castCharacter">{cast.character}</p>
      </div>
    </div>
  );
};

export default function CastList({ results }) {
  return (
    <div className="castList">
      {results
        .filter((cast) => cast.profile_path !== null)
        .map((cast, index) => {
          return <CastCard cast={cast} key={index} />;
        })}
    </div>
  );
}
