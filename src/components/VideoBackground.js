import React from "react";
import { Card } from "react-bootstrap";

import "../VideoBackground.css"

const VideoBackground = ({src}) => {
  return (
    <div style={{position:'absolute', top:'0', width:'98.8vw'}}>
      <img  src={src} alt="videobackground" style={{width:'100%', height:'100vh'}}></img>
    </div>
  );
};

export default VideoBackground;
