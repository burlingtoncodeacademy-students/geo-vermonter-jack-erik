import React from "react";

function MovementButton(props) {
  return (
    <button
      id="movementButton"
      disabled={props.disabled}
      onClick={() => {
        props.movementHandle(props.direction);
        props.findCounty()
      }}
    >
      {props.direction}
    </button>
  );
}

export default MovementButton;
