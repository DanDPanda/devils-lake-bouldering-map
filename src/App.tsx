import React from "react";
import logo from "./logo.svg";
import Typography from "./components/ui/typography";
import Map from "./components/map";
import "./App.css";

function App() {
  return (
    <div
      className="flex flex-col pt-11 pb-24 px-8 w-full items-center
        text-center gap-12"
    >
      <div className="flex flex-col gap-6 items-center">
        <h1 className="max-w-2xl" variant="h1">
          Devil's Lake Map
        </h1>
      </div>
      <Map />
    </div>
  );
}

export default App;
