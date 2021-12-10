import React from "react";

function Modal(props) {
  // check if modal should be open
  if (!props.modalIsOpen) {
    return null;
  } else {
    return (
      // div for shaded background
      <div id="modal-background">
        {/* // div for main modal display */}
        <div id="modal-box">
          <h2>Pick a county:</h2>
          {/*  */}
          {/* // ALL BELOW: radio boxes and labels for individual counties */}
          {/*  */}
          <ul>
            <li>
              <input
                type="radio"
                name="county"
                value="Addison County"
                onChange={props.handleAnswer}
              />
              <label for="Addison">Addison</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Bennington County"
                onChange={props.handleAnswer}
              />
              <label for="Bennington">Bennington</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Caledonia County"
                onChange={props.handleAnswer}
              />
              <label for="Caledonia">Caledonia</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Chittenden County"
                onChange={props.handleAnswer}
              />
              <label for="Chittenden">Chittenden</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Essex County"
                onChange={props.handleAnswer}
              />
              <label for="Essex">Essex</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Franklin County"
                onChange={props.handleAnswer}
              />
              <label for="Franklin">Franklin</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Grand Isle County"
                onChange={props.handleAnswer}
              />
              <label for="Grand Isle">Grand Isle</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Lamoille County"
                onChange={props.handleAnswer}
              />
              <label for="Lamoille">Lamoille</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Orange County"
                onChange={props.handleAnswer}
              />
              <label for="Orange">Orange</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Orleans County"
                onChange={props.handleAnswer}
              />
              <label for="Orleans">Orleans</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Rutland County"
                onChange={props.handleAnswer}
              />
              <label for="Rutland">Rutland</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Washington County"
                onChange={props.handleAnswer}
              />
              <label for="Washington">Washington</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Windham County"
                onChange={props.handleAnswer}
              />
              <label for="Windham">Windham</label>
            </li>
            <li>
              <input
                type="radio"
                name="county"
                value="Windsor County"
                onChange={props.handleAnswer}
              />
              <label for="Windsor">Windsor</label>
            </li>
          </ul>
          {/* // submit and cancel buttons, onClick take functions passed from parent */}
          <div id="modal-menu">
            <button className="button-modal" onClick={props.modalSubmit}>
              Submit
            </button>
            <button className="button-modal" onClick={props.modalUpdater}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
