import React from 'react';

import HomePage from "./components/HomePage";
import SeatMap from "./components/map/SeatMap";
import Feedback from "./components/Feedback";

function App() {
  return (
    <div className="App">
        <HomePage/>
        <SeatMap/>
        <Feedback/>
    </div>
  );
}

export default App;
