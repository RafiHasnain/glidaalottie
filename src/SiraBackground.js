import React from "react";
import { Card } from "react-bootstrap";
const SiraBackground = ({ src, message }) => {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "flex-start",
        padding: '10px',
        justifyContent:'center'
      }}
    >
      
      <div className="siria-card">
        <Card>
          <Card.Body>
            <Card.Text>{message}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default SiraBackground;
