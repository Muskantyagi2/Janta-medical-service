import React from "react";
import scooter from "../assets/scooter.png";
import home from "../assets/home.jpg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const deliveryBoyIcon = new L.Icon({
  iconUrl: scooter,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const customerIcon = new L.Icon({
  iconUrl: home,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
function DeliveryBoyTracking({ data }) {
  const deliveryBoyLat = data.deliveryBoyLocation?.lat;
  const deliveryBoylon = data.deliveryBoyLocation?.lon;
  const customerLat = data.customerLocation?.lat;
  const customerlon = data.customerLocation?.lon;

  // Check if we have valid coordinates
  if (!deliveryBoyLat || !deliveryBoylon || !customerLat || !customerlon) {
    return (
      <div
        className="w-full h-[400px] mt-3 rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          boxShadow: "0 4px 6px -1px #081B1B",
          border: "1px solid #203B37",
          backgroundColor: "#EEE8B2",
        }}
      >
        <div className="text-center">
          <p style={{ color: "#203B37" }}>Loading location data...</p>
          <p className="text-sm mt-2" style={{ color: "#5A8F76" }}>
            Delivery Boy: {deliveryBoyLat ? "✓" : "✗"} Customer:{" "}
            {customerLat ? "✓" : "✗"}
          </p>
        </div>
      </div>
    );
  }

  const path = [
    [deliveryBoyLat, deliveryBoylon],
    [customerLat, customerlon],
  ];

  const center = [deliveryBoyLat, deliveryBoylon];

  return (
    <div
      className="w-full h-[400px] mt-3 rounded-xl overflow-hidden"
      style={{
        boxShadow: "0 4px 6px -1px #081B1B",
        border: "1px solid #203B37",
      }}
    >
      <MapContainer className={"w-full h-full"} center={center} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Delivery Boy Marker */}
        <Marker
          position={[deliveryBoyLat, deliveryBoylon]}
          icon={deliveryBoyIcon}
        >
          <Popup>
            <div className="text-center">
              <strong>🛵 Delivery Boy</strong>
              <br />
              Location: {deliveryBoyLat.toFixed(4)}, {deliveryBoylon.toFixed(4)}
            </div>
          </Popup>
        </Marker>

        {/* Customer Marker */}
        <Marker position={[customerLat, customerlon]} icon={customerIcon}>
          <Popup>
            <div className="text-center">
              <strong>🏠 Delivery Address</strong>
              <br />
              Location: {customerLat.toFixed(4)}, {customerlon.toFixed(4)}
            </div>
          </Popup>
        </Marker>

        {/* Route Line */}
        <Polyline
          positions={path}
          color="#5A8F76"
          weight={4}
          opacity={0.7}
          dashArray="10, 10"
        />
      </MapContainer>
    </div>
  );
}

export default DeliveryBoyTracking;
