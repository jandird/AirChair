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
            tables: []
        }
    }

    componentDidMount() {
        let jsonSeats = json.seats;
        let jsonTables = json.tables;

        let seats = [];
        let tables = [];

        jsonSeats.map(s => seats.push(<Seat xcoord={s.xcoord} ycoord={s.ycoord} occupied={s.occupied}/>));
        jsonTables.map(t => tables.push(<Table xmin={t.xmin} ymin={t.ymin} xmax={t.xmax} ymax={t.ymax}/>));

        this.setState({seats: seats, tables: tables});
    }

    render() {
        return (
            <div id="map-page">
                <h1 id="title">Seat Map</h1>
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