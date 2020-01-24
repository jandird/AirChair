import React from 'react'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { Stage, Layer, Circle } from 'react-konva';
import Konva from 'konva';

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
            },

            loading: false,

            stageScale: 1,
            stageX: 0,
            stageY: 0
        }
    }

    componentDidMount() {
        let json = def;

        this.setState({loading: true});
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
                    let seatMapStyle;

                    jsonSeats.map(s => {
                        seats.push(<Seat xcoord={s.xcoord} ycoord={s.ycoord} occupied={s.occupied}/>);
                        xmin = Math.min(xmin, s.xcoord);
                        xmax = Math.max(xmax, s.xcoord);
                        ymin = Math.min(ymin, s.ycoord);
                        ymax = Math.max(ymax, s.ycoord);
                        return "";
                    });

                    jsonTables.map(t => {
                        tables.push(<Table xmin={t.xmin} ymin={t.ymin} xmax={t.xmax} ymax={t.ymax}/>);
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
                    this.setState({seats: seats, tables: tables, doors: doors, seatMapStyle: seatMapStyle, loading: false});
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
                            <Loading
                                show={this.state.loading}
                                color="red"
                            />
                            <Stage width={1000} height={1000} draggable={true} onWheel={this.handleWheel}
                                   scaleX={this.state.stageScale} scaleY={this.state.stageScale}
                                   x={this.state.stageX} y={this.state.stageY}
                            >
                                <Layer>
                                    {this.state.tables}
                                    {this.state.seats}
                                </Layer>
                            </Stage>
                            {/*<div id="outline"/>*/}
                            {/*<div id="seat-map" style={this.state.seatMapStyle}>*/}
                            {/*    /!*{this.state.tables}*!/*/}
                            {/*    {this.state.seats}*/}
                            {/*</div>*/}
                            {/*/!*<Door direct="L"/>*!/*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleWheel = e => {
        e.evt.preventDefault();

        const scaleBy = 1.02;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;


        this.setState({
            stageScale: newScale,
            stageX:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    };
}

export default SeatMap;