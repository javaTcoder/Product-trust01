import React from "react";
import CricketBall from "../../../Image/Loader-svg/LoaderBlack.svg";
import "./Loader.css";

const CricketBallLoader = () => (
  <div className="cricket-ball-loader">
    <img src={CricketBall} alt="Loading..." className="spinner" />
  </div>
);

export default CricketBallLoader;
