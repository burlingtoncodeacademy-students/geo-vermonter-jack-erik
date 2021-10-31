import { MapContainer, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "../data/border";
import ChangeView from "./ChangeView";
import leafletPip from "@mapbox/leaflet-pip"
import L from "leaflet";

function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map(coords => [coords[1], coords[0]])

  let vtData = L.geoJSON(vtOutline)
  
  // can we remove this line?
  let results = leafletPip.pointInLayer([props.center], vtData)

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
      {<Polyline positions={props.positions} pathOptions={props.pathOptions} dashArray={[10, 10]} dashOffset={10}/>}
    </MapContainer>
  );
}

export default Map;
