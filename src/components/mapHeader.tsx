import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState, useEffect } from "react";

interface MarkerData {
  latitude: number;
  longitude: number;
  url: string;
  location: string;
  rating: string;
  stars: number;
  route: string | number;
}

interface Props {
  visibleMarkers: MarkerData[];
  markers: MarkerData[];
  setCurrentMarkers: (markers: any) => void;
}

export default function MapHeader({
  visibleMarkers,
  markers,
  setCurrentMarkers,
}: Props) {
  const [isStarFilterOn, setIsStarFilterOn] = useState(true);
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    setCurrentMarkers(markers.filter((marker) => marker.stars >= 3.5));
  }, []);

  return (
    <div
      style={{
        paddingTop: "8px",
        paddingBottom: "8px",
        gap: "4px",
        backgroundColor: "white",
        border: "1px solid black",
        color: "black",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "fixed",
        zIndex: 1000,
      }}
    >
      <span>Visible Markers: {visibleMarkers.length}</span>
      <div style={{ display: "flex", alignItems: "end" }}>
        <span>3.5+ Filter:</span>
        <input
          type="checkbox"
          checked={isStarFilterOn}
          onChange={() => {
            if (isStarFilterOn) {
              setIsStarFilterOn(false);
              setCurrentMarkers(markers);
            } else {
              setIsStarFilterOn(true);
              setCurrentMarkers(
                markers.filter((marker) => marker.stars >= 3.5)
              );
            }
          }}
        ></input>
      </div>
      <div style={{ display: "flex", alignItems: "end", gap: "4px" }}>
        <span>Location:</span>
        <select>
          <option value="eastBluffNorth">East Bluff North</option>
          <option value="eastBluffSouth">East Bluff South</option>
          <option value="eastBluffSouthFace">East Bluff South Face</option>
          <option value="southBluff">South Bluff</option>
          <option value="westBluffSouth">West Bluff South</option>
          <option value="westBluffCentral">West Bluff Central</option>
          <option value="westBluffNorth">West Bluff North</option>
        </select>
      </div>
    </div>
  );
}
