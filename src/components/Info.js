import React from "react";

function Info(props) {
  if (props.infoEnabled) {
    return (
      <div>
        <p>Latitude: {props.lat}</p>
        <p>Longitude: {props.long}</p>
        <p>County: {props.county}</p>
        <p>Village: {props.village ? props.village : 'No village available'}</p>
        <p>Score: {props.score}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Latitude: ?</p>
        <p>Longitude: ?</p>
        <p>County: ?</p>
        <p>Village: ?</p>
        <p>Score: {props.score}</p>
      </div>
    );
  }
}

export default Info;
