import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import Form from "./SearchForm";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pickUpMarker from "./assets/pickUpMarker.svg";
import ToastNotification from "./components/ToastNotification";

const pickUpMarkerIcon = L.icon({
  iconUrl: pickUpMarker,
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Adjust the anchor point based on icon size
});

function Map() {
  const [addresses, setAddresses] = useState([]);
  return (
    <MapContainer
      className={styles.mapContainer}
      center={[48.8644714, 2.32630925]}
      zoom={13}
    >
    
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="..."
      />

      <div className={styles.formContainer}>
        <Form setAddresses={setAddresses}/>
      </div>

      {addresses.map((address, index) => (
        <Marker icon={pickUpMarkerIcon} key={index} position={[address.lat, address.lng]}>
          <Popup>{address.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;

