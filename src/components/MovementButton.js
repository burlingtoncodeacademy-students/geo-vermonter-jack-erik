import React from "react";

function MovementButton(props) {
  return (
    <button
      id="movementButton"
      // Sets the default to disabled
      disabled={props.disabled}
      onClick={() => {
        // Moves the location depending on the corresponding direction
        props.movementHandle(props.direction);
        props.findCounty()
      }}
    >
      {props.direction}
    </button>
  );
}

export default MovementButton;
