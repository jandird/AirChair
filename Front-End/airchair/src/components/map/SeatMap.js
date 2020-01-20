import React from 'react'
import Seat from "./Seat";
import Table from "./Table";

import "../../resources/css/Map.css"

import json from "../../json/default.json"

import door from "../../resources/images/DoorSwing.png"

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
                <div className="container" id="seat-map">
                    {this.state.tables}
                    {this.state.seats}
                    <img src={door} alt=""/>
                </div>
            </div>
        );
    }
}

export default SeatMap;