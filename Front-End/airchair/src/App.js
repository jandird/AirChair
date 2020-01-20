import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from "./components/HomePage";
import SeatMap from "./components/map/SeatMap";

function App() {
  return (
    <div className="App">
        <HomePage/>
        <SeatMap/>
    </div>
  );
}

export default App;
