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
  route: string;
  grade: string;
}

interface Props {
  visibleMarkers: MarkerData[];
  markers: MarkerData[];
  setCurrentMarkers: (markers: any) => void;
}

const favs = [
  "Big Bud Arete",
  "Good Morning Veruca",
  "Flux Boulder Classic",
  "Super Slab",
  "Saddle Sores",
  "Imp Act",
  "Sunny & 60's",
  "Smooth Operator",
  "Stairway",
  "Amazing Pillar",
  "Magnum PI",
  "A Slab Called Spot",
  "The Aviary",
  "Baby Crane",
  "Peaches",
  "Like Shaking Hands with God",
];

export default function MapHeader({
  visibleMarkers,
  markers,
  setCurrentMarkers,
}: Props) {
  const [isStarFilterOn, setIsStarFilterOn] = useState(false);
  const [isFavsFilterOn, setIsFavsFilterOn] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);

  useEffect(() => {
    let tempMarkers = markers;
    if (isStarFilterOn) {
      tempMarkers = tempMarkers.filter((marker) => marker.stars >= 3.5);
    }

    if (isFavsFilterOn) {
      tempMarkers = tempMarkers.filter((marker) =>
        favs.some((fav) => fav === marker.route)
      );
    }

    if (gradeFilter !== null) {
      if (gradeFilter === "V6-") {
        tempMarkers = tempMarkers.filter(
          (marker) =>
            marker.grade === "VB" ||
            marker.grade === "V0" ||
            marker.grade === "V1" ||
            marker.grade === "V2" ||
            marker.grade === "V3" ||
            marker.grade === "V4" ||
            marker.grade === "V5"
        );
      } else {
        tempMarkers = tempMarkers.filter(
          (marker) => marker.grade === gradeFilter
        );
      }
    }

    if (searchFilter !== null) {
      tempMarkers = tempMarkers.filter((marker) =>
        marker.route.toLowerCase().includes(searchFilter)
      );
    }

    setCurrentMarkers(tempMarkers);
  }, [
    isStarFilterOn,
    isFavsFilterOn,
    gradeFilter,
    searchFilter,
    markers,
    setCurrentMarkers,
  ]);

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
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
        <span>3.5+ Stars:</span>
        <input
          style={{ fontSize: "16px" }}
          type="checkbox"
          checked={isStarFilterOn}
          onChange={() => {
            if (isStarFilterOn) {
              setIsStarFilterOn(false);
            } else {
              setIsStarFilterOn(true);
            }
          }}
        ></input>
        <span>| Favs:</span>
        <input
          style={{ fontSize: "16px" }}
          type="checkbox"
          checked={isFavsFilterOn}
          onChange={() => {
            if (isFavsFilterOn) {
              setIsFavsFilterOn(false);
            } else {
              setIsFavsFilterOn(true);
            }
          }}
        ></input>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
        <span>Grade:</span>
        <select
          style={{ fontSize: "16px" }}
          onChange={(e) => {
            if (e.target.value === "") {
              setGradeFilter(null);
            } else {
              setGradeFilter(e.target.value);
            }
          }}
        >
          <option value="">--</option>
          <option value="V6-">V6-</option>
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
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
        <span>Search:</span>
        <input
          style={{ fontSize: "16px" }}
          type="text"
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchFilter(null);
            } else {
              setSearchFilter(e.target.value.toLowerCase());
            }
          }}
        ></input>
      </div>
    </div>
  );
}
