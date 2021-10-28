import './App.css';
import { useEffect, useState } from 'react'

import Map from './components/Map'
import North from './components/North'
import South from './components/South'
import East from './components/East'
import West from './components/West'

function App() {

  const [center, setCenter] = useState([43.88, -72.7317])
  const [county, setCounty] = useState(null);
  const [village, setVillage] = useState(null);

  const [poly, setPoly] = useState([center]);

  useEffect(() => {
    fetch("https://nominatim.openstreetmap.org/reverse.php?lat=" + center[0] + "&lon=" + center[1] + "&zoom=18&format=jsonv2")
    .then((res) => res.json())
    .then((res) => {
        setCounty(res.address.county)
        setVillage(res.address.village)
        // console.log(county);
        // console.log(village);
        // console.log(res.address);
      })
  })

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
      <Map center={center} positions={poly} pathOptions={maroonOptions}/>
      <North northHandle={northHandle}/>
      <South southHandle={southHandle}/>
      <East eastHandle={eastHandle}/>
      <West westHandle={westHandle}/>
    </div>
  );
}



export default App; 
// Typing commments for test! - Jack
// Typing comments for test! - Erik