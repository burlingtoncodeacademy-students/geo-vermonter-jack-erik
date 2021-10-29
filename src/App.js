import "./App.css";
import { useState } from "react";

import Map from "./components/Map";
import Modal from "./components/Modal";
import Info from "./components/Info"
import North from './components/North'
import South from './components/South'
import East from './components/East'
import West from './components/West'

function App(props) {
  const [center, setCenter] = useState([43.88, -72.7317]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [poly, setPoly] = useState([center]);

  const [zoom, setZoom] = useState(8);

  // stateful props for tracking county and village

  const [county, setCounty] = useState('');
  const [village, setVillage] = useState('');

  // // stateful props for position

  const [infoEnabled, setInfoEnabled] = useState(false)

  // setting up menu button enabling / disabling
  const [guessButton, setGuessButton] = useState("disabled");
  const [quitButton, setQuitButton] = useState("disabled");
  const [startButton, setStartButton] = useState("");
  const [goBackButton, setGoBackButton] = useState('disabled')

  // setting up score 
  const [score, setScore] = useState(100)

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
    setInfoEnabled(false)
    setZoom(18)

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

  

  function northHandle() {
    setPoly(poly => [...poly, [center[0] + .02, center[1]]])
    setCenter([center[0] + .02, center[1]])

  }

  function southHandle() {
    setPoly(poly => [...poly, [center[0] - .02, center[1]]])
    setCenter([center[0] - .02, center[1]])
  }

  function eastHandle() {
    setPoly(poly => [...poly, [center[0], center[1] + .02]])
    setCenter([center[0], center[1] + .02])
  }

  function westHandle() {
    setPoly(poly => [...poly, [center[0], center[1] - .02]])
    setCenter([center[0], center[1] - .02])
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
      <button onClick={goBack} disabled={goBackButton}>Return</button>
      <button onClick={quit} disabled={quitButton}>
        Quit
      </button>
      <Modal modalIsOpen={modalIsOpen} modalUpdater={modalUpdater} modalSubmit={modalSubmit} handleAnswer={handleAnswer} answer={answer}/>
      <Map center={center} positions={poly} pathOptions={maroonOptions} zoom={zoom}/>
      <North northHandle={northHandle}/>
      <South southHandle={southHandle}/>
      <East eastHandle={eastHandle}/>
      <West westHandle={westHandle}/>
      
    </div>
  );
}

export default App;