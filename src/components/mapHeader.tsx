import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Checkbox from "@mui/material/Checkbox";
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

  useEffect(() => {
    setCurrentMarkers(markers.filter((marker) => marker.stars >= 3.5));
  }, []);

  return (
    <div
      style={{
        paddingTop: "12px",
        backgroundColor: "white",
        border: "1px solid black",
        color: "black",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <span>Visible Markers: {visibleMarkers.length}</span>
      <div>
        <span>3.5+ Filter:</span>
        <Checkbox
          defaultChecked
          value={"3.5+"}
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
        />
      </div>
    </div>
  );
}
