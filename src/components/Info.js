import React from "react";

function Info(props) {

  {/* Displays/Hides correct information depending on the state of the game */}
  if (props.infoEnabled) {
    return (
      <div id="info-display">
        <ul>
          <li>Latitude: {props.lat}</li>
          <li>Longitude: {props.long}</li>
          <li>County: {props.county}</li>
          <li>
            Village: {props.village ? props.village : "No village available"}
          </li>
        </ul>
        <ul>
          <li>Score: {props.score}</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div id="info-display">
        <ul>
          <li>Latitude: ?</li>
          <li>Longitude: ?</li>
          <li>County: ?</li>
          <li>Village: ?</li>
        </ul>
        <ul>
          <li>Score: {props.score}</li>
        </ul>
      </div>
    );
  }
}

export default Info;
