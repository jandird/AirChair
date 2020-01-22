import React from 'react'

import Seat from "./Seat";
import Table from "./Table";
import Door from "./Door"

import "../../resources/css/Map.css"

import def from  "../../json/default.json"

class SeatMap extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            seats: [],
            tables: [],
            doors: [],

            seatMapStyle: {
                position: "absolute",
                marginLeft: 0,
                marginTop: 0
            }
        }
    }

    componentDidMount() {
        let json = def;

        fetch("http://127.0.0.1:5000/image-data")
            .then(res => res.json())
            .then(
                (result) => {
                    json = result;

                    let xmin = 0;
                    let xmax = 0;
                    let ymin = 0;
                    let ymax = 0;

                    console.log(json);
                    let jsonSeats = json.seats;
                    let jsonTables = json.tables;
                    let jsonDoors = json.door;

                    let seats = [];
                    let tables = [];
                    let doors = [];
                    let seatMapStyle = {};

                    jsonSeats.map(s => {
                        seats.push(<Seat xcoord={s.xcoord} ycoord={s.ycoord} occupied={s.occupied}/>);
                        xmin = Math.min(xmin, s.xcoord);
                        xmax = Math.max(xmax, s.xcoord);
                        ymin = Math.min(ymin, s.ycoord);
                        ymax = Math.max(ymax, s.ycoord);
                        return "";
                    });

                    jsonTables.map(t => {
                        tables.push(<Table xmin={t.xmin} ymin={t.ymin} xmax={t.xmax} ymax={t.ymax}/>)
                        xmin = Math.min(xmin, t.xmin);
                        xmax = Math.max(xmax, t.xmax);
                        ymin = Math.min(ymin, t.ymin);
                        ymax = Math.max(ymax, t.ymax);
                        return "";
                    });

                    seatMapStyle = {
                        position: "absolute",
                        marginLeft: (1134 - (xmax - xmin))/2 + "px",
                        marginTop: (550 - (ymax - ymin))/2 + "px"
                    };
                    console.log(seatMapStyle);
                    this.setState({seats: seats, tables: tables, doors: doors, seatMapStyle: seatMapStyle});
            });

        // jsonDoors.map(d => doors.push(<Door xcoord={d.xcoord} ycoord={d.ycoord} direction={d.direct}/>));

    }

    render() {
        return (
            <div id="map-page">
                <h1 id="title">Seat Map</h1>
                <h3 id="location">McMaster University - Thode - Group Meeting Room 1</h3>

                <div className="container" id="map-container">
                    <div className="row">
                        <div className="col-12">
                            <div id="outline"/>
                            <div id="seat-map" style={this.state.seatMapStyle}>
                                {this.state.tables}
                                {this.state.seats}
                            </div>
                            <Door direct="L"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SeatMap;