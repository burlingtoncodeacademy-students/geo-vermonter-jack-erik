import "./App.css";
import { useState } from "react";

import Map from "./components/Map";
import Modal from "./components/Modal";
import Info from "./components/Info"
import MovementButton from "./components/MovementButton";

function App(props) {
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [poly, setPoly] = useState([center]);

  // stateful props for tracking county and village
  const [county, setCounty] = useState('');
  const [village, setVillage] = useState('');

  // // stateful props for position

  const [infoEnabled, setInfoEnabled] = useState(false)

  // setting up menu button enabling / disabling
  const [guessButton, setGuessButton] = useState("disabled");
  const [quitButton, setQuitButton] = useState("disabled");
  const [startButton, setStartButton] = useState("");

  // setting up score 
  const [score, setScore] = useState(100)

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
      });
  }

  // function for main gameplay
  function startGame() {
    setQuitButton("");
    setGuessButton("");
    setStartButton("disabled");
    setInfoEnabled(false)

    // enable nav

    // WITHIN ANOTHER FUNCTION:
    // choose a random lat/long position,
    // center the map ( setCenter(random spot) ) to that position at zoom=18
    // display question marks inside the lat, long, county and town fields
  }

  // giving up / displaying answer
  function quit() {
    setStartButton("");
    setGuessButton("disabled");
    setQuitButton("disabled");
    setInfoEnabled(true);
    // display lat and long position inside info panel
    // display town & county inside info panel

    findCounty();
    console.log("county: " + county)
    console.log("village: " + village)
  }

  // open or close modal dialog
  function modalUpdater() {
    if (!modalIsOpen) {
      setModalIsOpen(true);
      setGuessButton("disabled");
    } else {
      setModalIsOpen(false);
      setGuessButton("");
    }
  }

  function movementHandle(direction) {
      let coordinates = [];
      switch(direction) {
        case "north":
          coordinates = [center[0] + .02, center[1]]
          break;
        case "south":
          coordinates = [center[0] - .02, center[1]]
          break;
        case "east":
          coordinates = [center[0], center[1] + .02]
          break;
        case "west":
          coordinates = [center[0], center[1] - .02]
          break;
        default:
          console.log("Uh oh");     
      }

      if (coordinates !== []) {
        setScore(score - 10)
        setPoly(poly => [...poly, coordinates])
        setCenter(coordinates)   

        console.log(score);
      }
      else {
        console.log("reached this")
        return null
      }  

  }

  const maroonOptions = { color: "maroon" }

  return (
    <div>
      <Info score={score} lat={center[0]} long={center[1]}county={county} village={village} infoEnabled={infoEnabled}/>  
      <button onClick={startGame} disabled={startButton}>
        Start
      </button>
      <button onClick={modalUpdater} disabled={guessButton}>
        Guess
      </button>
      <button onClick={quit} disabled={quitButton}>
        Quit
      </button>
      <Modal modalIsOpen={modalIsOpen} modalUpdater={modalUpdater} />
      <Map center={center} positions={poly} pathOptions={maroonOptions}/>
      <MovementButton movementHandle={movementHandle} direction="north"/>
      <MovementButton movementHandle={movementHandle} direction="south"/>
      <MovementButton movementHandle={movementHandle} direction="east"/>
      <MovementButton movementHandle={movementHandle} direction="west"/>
    </div>
  );
}

export default App;