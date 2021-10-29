import React from "react";

function MovementButton(props) {

    return (
        <button id="movementButton" onClick={() => {props.movementHandle(props.direction)}}>{props.direction}</button>
    )
}

export default MovementButton;