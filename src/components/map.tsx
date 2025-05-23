import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import type { LatLngExpression, Map, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import MapHeader from "./mapHeader";
import coloredMarkers from "./coloredMarkers";
import { devilsLakeData } from "../data/devils-lake";

interface MarkerData {
  latitude: number;
  longitude: number;
  url: string;
  location: string;
  rating: string;
  stars: number;
  route: string;
  icon: Icon;
  zIndex: number;
  grade: string;
}

const markers: MarkerData[] = [];

const combinedData = devilsLakeData;
combinedData.forEach((data) => {
  const tempData = structuredClone(data);
  while (
    markers.find(
      (marker) =>
        marker.latitude === tempData["Area Latitude"] &&
        marker.longitude === tempData["Area Longitude"]
    )
  ) {
    const isPositive = Math.random() >= 0.5;
    const direction = Math.random() >= 0.5 ? "Area Latitude" : "Area Longitude";
    if (isPositive) {
      tempData[direction] += 0.0001;
    } else {
      tempData[direction] -= 0.0001;
    }
  }
  let vGrade = tempData.Rating.split(" ").find((x: string) =>
    x.includes("V")
  ) as keyof typeof coloredMarkers;
  if (vGrade.includes("+")) {
    vGrade = vGrade.replace("+", "") as keyof typeof coloredMarkers;
  }
  if (vGrade.includes("-")) {
    vGrade = vGrade.split("-")[0] as keyof typeof coloredMarkers;
  }
  markers.push({
    latitude: tempData["Area Latitude"],
    longitude: tempData["Area Longitude"],
    url: tempData.URL,
    location: tempData.Location,
    rating: tempData.Rating,
    grade: vGrade,
    stars: tempData["Avg Stars"],
    route: tempData.Route.toString(),
    icon: coloredMarkers[vGrade] || coloredMarkers["V0"],
    zIndex: 0,
  });
});

const minneapolisLongLat: LatLngExpression = [43.41921, -89.728];

export default function MapComponent() {
  const [map, setMap] = useState<Map | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<MarkerData | null>(null);
  const [currentMarkers, setCurrentMarkers] = useState(markers);
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerData[]>([]);

  const recalculateMarkers = useCallback(
    (m: Map) => {
      const mapBounds = m.getBounds();
      const northEast = mapBounds.getNorthEast();
      const southWest = mapBounds.getSouthWest();
      const tempVisibleMarkers = currentMarkers.filter((marker) => {
        return (
          marker.latitude <= northEast.lat &&
          marker.latitude >= southWest.lat &&
          marker.longitude <= northEast.lng &&
          marker.longitude >= southWest.lng
        );
      });

      setVisibleMarkers(tempVisibleMarkers);
    },
    [currentMarkers]
  );

  map?.on("zoom", () => {
    recalculateMarkers(map);
  });
  map?.on("resize", () => {
    recalculateMarkers(map);
  });
  map?.on("drag", () => {
    recalculateMarkers(map);
  });

  useEffect(() => {
    if (map) {
      recalculateMarkers(map);
    }
  }, [map, currentMarkers, recalculateMarkers]);

  const f = useMemo(() => {
    const items = [...visibleMarkers];
    const item = visibleMarkers.findIndex(
      (visibleMarker) => visibleMarker.url === hoveredMarker?.url
    );
    items[item] = {
      ...items[item],
      icon: coloredMarkers["V0"],
      zIndex: 100,
    };

    return items;
  }, [hoveredMarker, visibleMarkers]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapHeader
        visibleMarkers={visibleMarkers}
        markers={markers}
        setCurrentMarkers={setCurrentMarkers}
      />
      <div
        style={{
          display: "inline-flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <MapContainer
          center={minneapolisLongLat}
          zoom={15}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
          ref={setMap}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {f.map((data) => {
            return (
              <Marker
                key={data.url}
                position={[data.latitude, data.longitude]}
                icon={data.icon}
                zIndexOffset={data.zIndex}
              >
                <Popup>
                  <>
                    {data.route} ({data.stars})
                    <br />
                    {data.rating}
                    <br />
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={data.url}
                    >
                      Mountain Project Link
                    </a>
                  </>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
