import React from "react";
import "../styles/CastList.css";
import { routes } from "../api";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.4,
    },
  }),
  hidden: { opacity: 0 },
};
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
    <AnimatePresence>
      <div className="castList">
        {results
          .filter((cast) => cast.profile_path !== null)
          .map((cast, index) => {
            return (
              <motion.div custom={index} animate="visible" variants={variants}>
                <CastCard cast={cast} key={index} />
              </motion.div>
            );
          })}
      </div>
    </AnimatePresence>
  );
}
