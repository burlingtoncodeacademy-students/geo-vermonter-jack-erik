import "./App.css";
import { useState } from "react";

import Map from "./components/Map";
import Modal from "./components/Modal";
import Info from "./components/Info"
import MovementButton from "./components/MovementButton";

function App(props) {
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Stateful array of points traveled to
  const [poly, setPoly] = useState([]);

  // Stateful variable for the zoom value of the map
  const [zoom, setZoom] = useState(8);

  // stateful props for tracking county and village
  const [county, setCounty] = useState('');
  const [village, setVillage] = useState('');

  // // stateful props for position

  const [infoEnabled, setInfoEnabled] = useState(true)

  // setting up menu button enabling / disabling
  const [guessButton, setGuessButton] = useState("disabled");
  const [quitButton, setQuitButton] = useState("disabled");
  const [startButton, setStartButton] = useState("");
  const [goBackButton, setGoBackButton] = useState('disabled');
  const [movementButton, setMovementButton] = useState('disabled');

  // setting up score 
  const [score, setScore] = useState(100)

  // start boolean
  const [start, setStart] = useState(false)

  const [answer, setAnswer] = useState('not set')

  function handleAnswer (evt) {
    setAnswer(evt.target.value);
  };

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
    setGoBackButton("")
    setMovementButton("");
    setInfoEnabled(true)
    setZoom(18)
    setStart(true)
    setCenter([(Math.random() * (45.005419 - 42.730315) + 42.730315), (Math.random() * (-71.510225 - -73.35218) + -73.35218)])

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
    setGoBackButton("disabled")
    setMovementButton("disabled");
    setStart(false)

    // display lat and long position inside info panel
    // display town & county inside info panel
    setInfoEnabled(true);
    setZoom(10);

    findCounty();
    console.log("county: " + county)
    console.log("village: " + village)
  }

  function goBack() {
    setCenter(poly[0])
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

  function modalSubmit() {
    console.log('guess submitted')
    if (answer !== county) {
      console.log('incorrect')
    } else {
      console.log('correct')
    }
  }


  // Moves the center markers coordinates around the map
  function movementHandle(direction) {
      let coordinates = [];
      // Adjusts coordinates given whatever the entered direction was
      switch(direction) {
        // Adjusts score and coordinates
        case "north":
          setScore(score - 1)
          coordinates = [center[0] + .02, center[1]]
          break;
        case "south":
          setScore(score - 1)
          coordinates = [center[0] - .02, center[1]]
          break;
        case "east":
          setScore(score - 1)
          coordinates = [center[0], center[1] + .02]
          break;
        case "west":
          setScore(score - 1)
          coordinates = [center[0], center[1] - .02]
          break;
        default:
          console.log("Uh oh");     
      }

      if (coordinates !== []) {
        // Takes old poly array and pushes the coordinates to it
        setPoly(poly => [...poly, coordinates])
        // Recenters the marker
        setCenter(coordinates)   
      }
      else {
        return null
      }  

  }

  // Sets line color to maroon
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
      <button onClick={goBack} disabled={goBackButton}>Return</button>
      <button onClick={quit} disabled={quitButton}>
        Quit
      </button>

      <Modal modalIsOpen={modalIsOpen} modalUpdater={modalUpdater} modalSubmit={modalSubmit} handleAnswer={handleAnswer} answer={answer}/>
      <Map start={start} center={center} setCenter={setCenter} positions={poly} pathOptions={maroonOptions} zoom={zoom}/>


      <MovementButton movementHandle={movementHandle} direction="north" disabled={movementButton}/>
      <MovementButton movementHandle={movementHandle} direction="south" disabled={movementButton}/>
      <MovementButton movementHandle={movementHandle} direction="east" disabled={movementButton}/>
      <MovementButton movementHandle={movementHandle} direction="west" disabled={movementButton}/>
    </div>
  );
}

export default App;