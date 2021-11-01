import { useMap } from "react-leaflet";

function ChangeView(props) {
    // Grabs map on the page
    const map = useMap();
    // Takes new center input and zoom value from Map.js
    map.setView(props.center, props.zoom);
    return null;
}

export default ChangeView;
