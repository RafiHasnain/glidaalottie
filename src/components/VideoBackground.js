import React from "react";
import { Card } from "react-bootstrap";

import "../VideoBackground.css"

const VideoBackground = ({src}) => {
  return (
    <div style={{position:'absolute', top:'0', widht:"100vw", height:'100vh'}}>
      <img  src={src} alt="videobackground" style={{width:'100%'}}></img>
    </div>
  );
};

export default VideoBackground;
