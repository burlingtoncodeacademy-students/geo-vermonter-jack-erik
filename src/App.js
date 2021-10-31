// notes for merge:
// removed errant console logs

// remove north, south, east, west.js?
// remove app-jack
// remove line 13 in map.js

import "./App.css";
import { useState } from "react";

import Map from "./components/Map";
import Modal from "./components/Modal";
import Info from "./components/Info";
import MovementButton from "./components/MovementButton";

function App(props) {
  const [center, setCenter] = useState([43.88, -72.7317]);

  // prop for opening and closing modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [poly, setPoly] = useState([center]);
  const [zoom, setZoom] = useState(8);

  // stateful props for tracking county and village

  const [county, setCounty] = useState("");
  const [village, setVillage] = useState("");

  // // stateful props for position

  const [infoEnabled, setInfoEnabled] = useState(false);

  // setting up menu button enabling / disabling
  const [guessButton, setGuessButton] = useState("disabled");
  const [quitButton, setQuitButton] = useState("disabled");
  const [startButton, setStartButton] = useState("");
  const [goBackButton, setGoBackButton] = useState("disabled");
  const [navButton, setNavButton] = useState("disabled");

  // setting up score
  const [score, setScore] = useState(100);

  // setting up answer, & function to pass that sets it
  const [answer, setAnswer] = useState("Not set");
  function handleAnswer(evt) {
    setAnswer(evt.target.value);
  }

  // use geocoding to lookup town and county, set them to stateful props
  function findCounty() {

    fetch(
      "https://nominatim.openstreetmap.org/reverse.php?lat=" +
        center[0] +
        "&lon=" +
        center[1] +
        "&zoom=18&format=jsonv2"
    )
      .then((res) => res.json())
      .then((res) => {
        setCounty(res.address.county);
        setVillage(res.address.village);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // function for main gameplay
  function startGame() {
    // updating county & village
    findCounty();
    // disabling/enabling buttons
    setNavButton("");
    setQuitButton("");
    setGuessButton("");
    setStartButton("disabled");
    setGoBackButton("");

    // disable info display, set zoom
    setInfoEnabled(false);
    setZoom(18);
  }

  // giving up / displaying answer
  function quit() {
    setStartButton("");
    setGuessButton("disabled");
    setQuitButton("disabled");
    setGoBackButton("disabled");

    // update county & village props
    findCounty();

    // display lat and long position inside info panel
    // display town & county inside info panel
    setInfoEnabled(true);
    setZoom(8);
  }

  // return to first position
  function goBack() {
    setCenter(poly[0]);

    // update county & village props
    findCounty()
  }

  // open or close modal dialog
  function modalUpdater() {
    if (!modalIsOpen) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  }

  // checking answer and routing to appropriate actions
  function modalSubmit() {
    if (answer !== county) {
      setScore(score - 10);
      alert("Incorrect answer!");
      setModalIsOpen(false);
    } else {
      alert(`Correct answer! Final score: ${score}`);
      setInfoEnabled(true);
      modalUpdater();
      setZoom(8);
    }
  }

  function movementHandle(direction) {
    let coordinates = [];
    switch (direction) {
      case "North":
        coordinates = [center[0] + 0.02, center[1]];
        break;
      case "South":
        coordinates = [center[0] - 0.02, center[1]];
        break;
      case "East":
        coordinates = [center[0], center[1] + 0.02];
        break;
      case "West":
        coordinates = [center[0], center[1] - 0.02];
        break;
      default:
        console.log("Uh oh");
    }

    if (coordinates !== []) {
      setScore(score - 1);
      setPoly((poly) => [...poly, coordinates]);
      setCenter(coordinates);

    } else {
      return null;
    }
  }

  const maroonOptions = { color: "maroon" };

  return (
    <div id="body">
      
      {/* menu buttons */}
      <div id="menu">
        <h3>Menu</h3>
        <button onClick={startGame} disabled={startButton}>
          Start
        </button>
        <button onClick={modalUpdater} disabled={guessButton}>
          Guess
        </button>
        <button onClick={goBack} disabled={goBackButton}>
          Return
        </button>
        <button onClick={quit} disabled={quitButton}>
          I Give Up
        </button>
      </div>
      {/* modal dialog component */}
      <Modal
        modalIsOpen={modalIsOpen}
        modalUpdater={modalUpdater}
        modalSubmit={modalSubmit}
        handleAnswer={handleAnswer}
        answer={answer}
      />
      {/* map component */}
      <div>
      <h1 id='header'>GEO-VERMONTER</h1>
        <Map
          center={center}
          positions={poly}
          pathOptions={maroonOptions}
          zoom={zoom}
        />
        <Info id="info-panel"
          score={score}
          lat={center[0]}
          long={center[1]}
          county={county}
          village={village}
          infoEnabled={infoEnabled}
        />
      </div>

      <div id="nav">
      <h3>Movement</h3>
      <MovementButton
        disabled={navButton}
        findCounty={findCounty}
        movementHandle={movementHandle}
        direction="North"
      />
      <MovementButton
        disabled={navButton}
        findCounty={findCounty}
        movementHandle={movementHandle}
        direction="South"
      />
      <MovementButton
        disabled={navButton}
        findCounty={findCounty}
        movementHandle={movementHandle}
        direction="East"
      />
      <MovementButton
        disabled={navButton}
        findCounty={findCounty}
        movementHandle={movementHandle}
        direction="West"
      />
      </div>
    </div>
  );
}

export default App;
