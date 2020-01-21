import React from 'react'

import Seat from "./Seat";
import Table from "./Table";
import Door from "./Door"

import "../../resources/css/Map.css"

import json from "../../json/default.json"

class SeatMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            seats: [],
            tables: [],
            doors: []
        }
    }

    componentDidMount() {
        let jsonSeats = json.seats;
        let jsonTables = json.tables;
        let jsonDoors = json.doors;

        let seats = [];
        let tables = [];
        let doors = [];

        jsonSeats.map(s => seats.push(<Seat xcoord={s.xcoord} ycoord={s.ycoord} occupied={s.occupied}/>));
        jsonTables.map(t => tables.push(<Table xmin={t.xmin} ymin={t.ymin} xmax={t.xmax} ymax={t.ymax}/>));
        jsonDoors.map(d => doors.push(<Door xcoord={d.xcoord} ycoord={d.ycoord} direction={d.direct}/>));

        this.setState({seats: seats, tables: tables, doors: doors});
    }

    render() {
        return (
            <div id="map-page">
                <h1 id="title">Seat Map</h1>
                <h3 id="location">McMaster University - Thode - Group Meeting Room 1</h3>
                <div className="container" id="seat-map">
                    {this.state.tables}
                    {this.state.seats}
                    <Door/>
                </div>
            </div>
        );
    }
}

export default SeatMap;