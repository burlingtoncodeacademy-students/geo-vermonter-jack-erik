import React from "react";

// this component displays information passed from App.js
function Info(props) {

  {/* Displays/Hides correct information depending on the state of the game */}
  if (props.infoEnabled) {
    return (
      <div id="info-display">
        {/* if info is enabled, show current lat, long, county, village (if there is one) */}
        <ul>
          <li>Latitude: {props.lat}</li>
          <li>Longitude: {props.long}</li>
          <li>County: {props.county}</li>
          <li>
            Village: {props.village ? props.village : "No village available"}
          </li>
        </ul>
        <ul>
          {/* show current score */}
          <li>Score: {props.score}</li>
        </ul>
      </div>
    );
  } else {
    // else show ? values for those fields
    return (
      <div id="info-display">
        <ul>
          <li>Latitude: ?</li>
          <li>Longitude: ?</li>
          <li>County: ?</li>
          <li>Village: ?</li>
        </ul>
        <ul>
          {/* show current score */}
          <li>Score: {props.score}</li>
        </ul>
      </div>
    );
  }
}

export default Info;
