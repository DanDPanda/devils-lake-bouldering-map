import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";
import { marker } from "leaflet";

interface MarkerData {
  latitude: number;
  longitude: number;
  url: string;
  location: string;
  rating: string;
  stars: number;
  route: string;
  grade: string;
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
  const [isStarFilterOn, setIsStarFilterOn] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

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
            let tempMarkers = markers;

            if (isStarFilterOn) {
              setIsStarFilterOn(false);
            } else {
              setIsStarFilterOn(true);
              tempMarkers = markers.filter((marker) => marker.stars >= 3.5);
            }

            if (gradeFilter !== null) {
              tempMarkers = tempMarkers.filter(
                (marker) => marker.grade === gradeFilter
              );
            }

            if (searchFilter !== null) {
              tempMarkers = tempMarkers.filter((marker) =>
                marker.route.toLowerCase().includes(searchFilter)
              );
            }

            setCurrentMarkers(tempMarkers);
          }}
        ></input>
      </div>
      <div style={{ display: "flex", alignItems: "end", gap: "4px" }}>
        <span>Grade:</span>
        <select
          onChange={(e) => {
            const selectedGrade = e.target.value;
            let tempMarkers = markers;

            if (selectedGrade === "") {
              setGradeFilter(null);
            } else {
              setGradeFilter(selectedGrade);
              tempMarkers = markers.filter(
                (marker) => marker.grade === selectedGrade
              );
            }

            if (isStarFilterOn) {
              tempMarkers = tempMarkers.filter((marker) => marker.stars >= 3.5);
            }

            if (searchFilter !== null) {
              tempMarkers = tempMarkers.filter((marker) =>
                marker.route.toLowerCase().includes(searchFilter)
              );
            }

            setCurrentMarkers(tempMarkers);
          }}
        >
          <option value="">--</option>
          <option value="VB">VB</option>
          <option value="V0">V0</option>
          <option value="V1">V1</option>
          <option value="V2">V2</option>
          <option value="V3">V3</option>
          <option value="V4">V4</option>
          <option value="V5">V5</option>
          <option value="V6">V6</option>
          <option value="V7">V7</option>
          <option value="V8">V8</option>
          <option value="V9">V9</option>
          <option value="V10">V10</option>
          <option value="V11">V11</option>
          <option value="V12">V12</option>
        </select>
      </div>
      <div style={{ display: "flex", alignItems: "end", gap: "4px" }}>
        <span>Search:</span>
        <input
          type="text"
          onChange={(e) => {
            let tempMarkers = markers;

            if (e.target.value === "") {
              setSearchFilter(null);
            } else {
              tempMarkers = markers.filter((marker) =>
                marker.route.toLowerCase().includes(e.target.value)
              );

              setSearchFilter(e.target.value);
            }

            if (isStarFilterOn) {
              tempMarkers = tempMarkers.filter((marker) => marker.stars >= 3.5);
            }

            if (gradeFilter !== null) {
              tempMarkers = tempMarkers.filter(
                (marker) => marker.grade === gradeFilter
              );
            }

            setCurrentMarkers(tempMarkers);
          }}
        ></input>
      </div>
    </div>
  );
}
