import React from "react";
import { useState } from "react";

function Modal(props) {
//   let answer = "";

//   let handleGuess = (evt) => {
//     answer = evt.target.value;
//     console.log(answer);
//   };

  if (!props.modalIsOpen) {
    return null;
  } else {
    return (
      <div id="modal-background">
        <div id="modal-box">
          <h1>Pick a county:</h1>
          <input
            type="radio"
            name="county"
            value="Addison"
            onChange={props.handleAnswer}
          />
          <label for="Addison">Addison</label>
           <input
            type="radio"
            name="county"
            value="Bennington"
            onChange={props.handleAnswer}
          />
          <label for="Bennington">Bennington</label>
          <input
            type="radio"
            name="county"
            value="Caledonia"
            onChange={props.handleAnswer}
          />
          <label for="Caledonia">Caledonia</label>
          <input
            type="radio"
            name="county"
            value="Chittenden"
            onChange={props.handleAnswer}
          />
          <label for="Chittenden">Chittenden</label>
          <input
            type="radio"
            name="county"
            value="Essex"
            onChange={props.handleAnswer}
          />
          <label for="Essex">Essex</label>
          <input
            type="radio"
            name="county"
            value="Franklin"
            onChange={props.handleAnswer}
          />
          <label for="Franklin">Franklin</label>
          <input
            type="radio"
            name="county"
            value="Grand Isle"
            onChange={props.handleAnswer}
          />
          <label for="Grand Isle">Grand Isle</label>
          <input
            type="radio"
            name="county"
            value="Lamoille"
            onChange={props.handleAnswer}
          />
          <label for="Lamoille">Lamoille</label>
          <input
            type="radio"
            name="county"
            value="Orange"
            onChange={props.handleAnswer}
          />
          <label for="Orange">Orange</label>
          <input
            type="radio"
            name="county"
            value="Orleans"
            onChange={props.handleAnswer}
          />
          <label for="Orleans">Orleans</label>
          <input
            type="radio"
            name="county"
            value="Rutland"
            onChange={props.handleAnswer}
          />
          <label for="Rutland">Rutland</label>
          <input
            type="radio"
            name="county"
            value="Washington"
            onChange={props.handleAnswer}
          />
          <label for="Washington">Washington</label>
          <input
            type="radio"
            name="county"
            value="Windham"
            onChange={props.handleAnswer}
          />
          <label for="Windham">Windham</label>
          <input
            type="radio"
            name="county"
            value="Windsor"
            onChange={props.handleAnswer}
          />
          <label for="Windsor">Windsor</label>
        </div>
        <button onClick={props.modalSubmit}>Submit Guess</button>
        <button onClick={props.modalUpdater}>Cancel</button>
        <p id='guess-displey'>Your guess: {props.answer} County</p>
      </div>

    );
  }

  // functions for guess and cancel (in parent/pass as props?)
}

export default Modal;
