import { MapContainer, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "../data/border";
import ChangeView from "./ChangeView";
import leafletPip from "@mapbox/leaflet-pip"
import L from "leaflet";
import { useEffect, useState } from "react";

function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map(coords => [coords[1], coords[0]])


  const [newLat, setNewLat] = useState(props.center[0]);
  const [newLon, setNewLon] = useState(props.center[1]);


  // useEffect(() => {
  //   let vtData = L.geoJSON(borderData);
  //   leafletPip.bassackwards = true;

  //   console.log(vtData);

  //   let results = leafletPip.pointInLayer(props.center, vtData);

  //   setNewLat(Math.random() * (45.005419 - 42.730315) + 42.730315);
  //   setNewLon(Math.random() * (-71.510225 - -73.35218) + -73.35218);

  //   if (!props.start) {
  //     props.setCenter([newLat, newLon]);
  //   }

  //   while(!vtData.getBounds().contains(props.center)) {
  //     setNewLat(Math.random() * (45.005419 - 42.730315) + 42.730315);
  //     setNewLon(Math.random() * (-71.510225 - -73.35218) + -73.35218);
  //     results = leafletPip.pointInLayer(props.center, vtData)
  //     console.log("results: " + results);
  //     props.setCenter([newLat, newLon]);
  //   }
  // }, [])

  return (
    <MapContainer id="map-container"
      center={props.center}
      zoom={props.zoom}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
      touchZoom={false}
      style={{ height: "600px", width: "600px" }}
      dragging={false}
    >
      {/* ChangeView - used for recentering the map's perspective: center and zoom taken from App.js */}
      <ChangeView center={props.center} zoom={props.zoom}/>
      <TileLayer id='tile-layer'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
      <Marker position={props.center} />
      <Polygon
        positions={vtOutline}
        pathOptions={{ color: "orange", fillOpacity: 0 }}
      />
      {/* Dotted line expression tracking where the user has gone with the directional buttons: positions and pathOptions taken from App.js */}
      {<Polyline positions={props.positions} pathOptions={props.pathOptions} dashArray={[10, 10]} dashOffset={10}/>}
    </MapContainer>
  );
}

export default Map;
