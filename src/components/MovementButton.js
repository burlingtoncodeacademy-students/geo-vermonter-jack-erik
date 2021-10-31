import React from "react";

function MovementButton(props) {

    // Returns button with movementHandle from App.js as an onClick method and direction as an argument
    return (
        <button id="movementButton" disabled={props.disabled} onClick={() => {props.movementHandle(props.direction)}}>{props.direction}</button>
    )
}

export default MovementButton;