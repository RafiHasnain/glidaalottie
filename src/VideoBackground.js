import React from "react";
import { Card } from "react-bootstrap";

import "./VideoBackground.css"

const VideoBackground = ({ src, message}) => {
  return (
    <div style={{position:'relative', display:'flex', justifyContent:'flex-start'}}>
      <img  src={src} alt="videobackground" style={{width:'100vw'}}></img>
      <div className="video-card" >
        <Card>
            <Card.Body>
            <Card.Text>{message}</Card.Text>
            </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default VideoBackground;
