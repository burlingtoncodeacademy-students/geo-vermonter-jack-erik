import "./App.css";
import { useState } from "react";

import Map from "./components/Map";
import Modal from "./components/Modal";
import Info from "./components/Info";
import MovementButton from "./components/MovementButton";

function App() {
  const [center, setCenter] = useState([43.88, -72.7317]);

  // prop for opening and closing modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // State array of points traveled to
  const [poly, setPoly] = useState([]);

  // State for the zoom value of the map
  const [zoom, setZoom] = useState(8);

  // states for tracking county and village
  const [county, setCounty] = useState("");
  const [village, setVillage] = useState("");

  // setting up menu button enabling / disabling
  const [infoEnabled, setInfoEnabled] = useState(false);
  const [guessButton, setGuessButton] = useState("disabled");
  const [quitButton, setQuitButton] = useState("disabled");
  const [startButton, setStartButton] = useState("");
  const [goBackButton, setGoBackButton] = useState("disabled");
  const [navButton, setNavButton] = useState("disabled");

  // setting up score
  const [score, setScore] = useState(100);

  // start boolean
  const [start, setStart] = useState(false);

  // setting up answer, & function to pass that sets it
  const [answer, setAnswer] = useState("Not set");
  function handleAnswer(evt) {
    setAnswer(evt.target.value);
  }

  // use geocoding to lookup town and county, set them to states
  function findCounty() {
    fetch(
      // passing current center into openstreetmap url
      "https://nominatim.openstreetmap.org/reverse.php?lat=" +
        center[0] +
        "&lon=" +
        center[1] +
        "&zoom=18&format=jsonv2"
    )
      .then((res) => res.json())
      .then((res) => {
        // setting county and village states with results
        setCounty(res.address.county);
        setVillage(res.address.village);
      })
      .catch((error) => {
        // error handling
        console.log(error.message);
      });
  }

  // function for main gameplay
  function startGame() {
    // disabling/enabling buttons
    setNavButton("");
    setQuitButton("");
    setGuessButton("");
    setStartButton("disabled");
    setGoBackButton("");

    // reset score if replaying game
    setScore(100);

    // set initial map parameters
    setZoom(18);
    setStart(true);
    // setCenter([(Math.random() * (45.005419 - 42.730315) + 42.730315), (Math.random() * (-71.510225 - -73.35218) + -73.35218)])
    // setPoly([])

    // disable info display, set zoom
    setInfoEnabled(false);
    setZoom(18);

    // updating county & village
    findCounty();
  }

  // giving up / displaying answer
  function quit() {
    setStartButton("");
    setGuessButton("disabled");
    setQuitButton("disabled");
    setGoBackButton("disabled");
    setNavButton("disabled");
    setStart(false);

    // If else case for whether the user gave up on the first turn
    if (poly[0] !== undefined) {
      console.log("Quit: poly[0]", poly[0]);
      setCenter(poly[0]);
    } else {
      console.log("Quit: center", center);
      setCenter(center);
    }

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
    findCounty();
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
    findCounty();
    if (answer !== county) {
      // case for incorrect answer
      setScore(score - 10);
      alert("Incorrect answer!");
      setModalIsOpen(false);
    } else {
      // case for correct answer
      alert(`Correct answer! Final score: ${score}`);
      setInfoEnabled(true);

      // reset buttons to replay game if desired
      setStartButton("");
      setNavButton("disabled");
      setGuessButton("disabled");
      setGoBackButton("disabled");
      setQuitButton("disabled");

      // close modal
      modalUpdater();
      setZoom(8);
    }
  }

  // Moves the center markers coordinates around the map
  function movementHandle(direction) {
    let coordinates = [];
    // Adjusts coordinates given whatever the entered direction was
    switch (direction) {
      // Adjusts score and coordinates
      // move north
      case "North":
        setScore(score - 1);
        coordinates = [center[0] + 0.02, center[1]];
        break;
      // move south
      case "South":
        setScore(score - 1);
        coordinates = [center[0] - 0.02, center[1]];
        break;
      // move east
      case "East":
        setScore(score - 1);
        coordinates = [center[0], center[1] + 0.02];
        break;
      // move west
      case "West":
        setScore(score - 1);
        coordinates = [center[0], center[1] - 0.02];
        break;
      default:
        console.log("Uh oh");
    }

    if (coordinates !== []) {
      // Takes old poly array and pushes the coordinates to it
      setPoly((poly) => [...poly, coordinates]);
      // Recenters the marker
      setCenter(coordinates);
    } else {
      return null;
    }
  }

  // Colors line maroon!
  const maroonOptions = { color: "maroon" };

  return (
    <div id="body">
      {/* menu buttons */}
      <div id="menu">
        <h3>Menu</h3>
        {/* props determine functionality and whether button is disabled */}
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
        // passing props to update behavior of modal in parent
        modalIsOpen={modalIsOpen}
        modalUpdater={modalUpdater}
        modalSubmit={modalSubmit}
        handleAnswer={handleAnswer}
        answer={answer}
      />
      <div>
        <h1 id="header">GEO-VERMONTER</h1>
        {/* map component */}
        <Map
          center={center}
          positions={poly}
          pathOptions={maroonOptions}
          zoom={zoom}
          start={start}
          setCenter={setCenter}
        />
        {/* info component */}
        <Info
          id="info-panel"
          score={score}
          lat={center[0]}
          long={center[1]}
          county={county}
          village={village}
          infoEnabled={infoEnabled}
        />
      </div>

      {/* nav component */}
      <div id="nav">
        <h3>Movement</h3>
        {/* creating instances of MovementButton for different directions */}
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
