import React from 'react';

import HomePage from "./components/HomePage";
import SeatMap from "./components/map/SeatMap";

import './App.css';

function App() {
  return (
    <div className="App">
        <HomePage/>
        <SeatMap/>
    </div>
  );
}

export default App;
