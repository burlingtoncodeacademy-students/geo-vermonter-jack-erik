import { MapContainer, TileLayer, Polygon, Marker, Polyline } from "react-leaflet";
import borderData from "../data/border";
import ChangeView from "./ChangeView";
import leafletPip from "@mapbox/leaflet-pip"
import L from "leaflet";

function Map(props) {
  let vtOutline = borderData.geometry.coordinates[0].map(coords => [coords[1], coords[0]])

  // console.log(leafletPip);
  // console.log(L);
  //console.log(vtOutline);

  let vtData = L.geoJSON(vtOutline)
  let results = leafletPip.pointInLayer([props.center], vtData)

  console.log(props.center)
  console.log(results)

  console.log(results);


  

  return (
    <MapContainer
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
      <TileLayer
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
