import React from 'react'
import Loading from 'react-loading-bar'
import 'react-loading-bar/dist/index.css'
import { Stage, Layer} from 'react-konva';

import Seat from "./Seat";
import Table from "./Table";

import "../../resources/css/Map.css"

import def from  "../../json/default.json"

class SeatMap extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            grid: [],

            seats: [],
            tables: [],
            doors: [],

            totalSeats: 0,
            occupiedSeats: 0,
            occupancyPercent: 0,
            occupancyState: "unoccup",

            loading: false,

            stageWidth: 1000,
            stageHeight: 1000,
            stageScale: 0.3,
            stageX: 0,
            stageY: 0,
        };
    }

    componentDidMount() {
        let json = def;

        this.setState({loading: true});
        fetch("http://127.0.0.1:5000/image-data")
            .then(res => res.json())
            .then(
                (result) => {
                    json = result;

                    console.log(json);
                    let jsonSeats = json.seats;
                    let jsonTables = json.tables;

                    let grid = new Array(50);

                    for (let i = 0; i < grid.length; i++){
                        grid[i] = new Array(50);
                    }

                    let seats = [];
                    let tables = [];
                    let doors = [];

                    let totalSeats = 0;
                    let occupiedSeats = 0;

                    jsonTables.map(t => {
                        let xmin = parseInt(t.xmin / 150);
                        let xmax = parseInt(t.xmax / 150);
                        let ymin = parseInt(t.ymin / 150);
                        let ymax = parseInt(t.ymax / 150);

                        let findGrid = true;
                        let count = 0;
                        while (findGrid){
                            if (grid[xmin][ymin] !== undefined || grid[xmin][ymax] !== undefined || grid[xmax][ymin] !== undefined || grid[xmax][ymax] !== undefined){
                                xmin++;
                                xmax++;
                            }
                            else {
                                findGrid = false;
                            }
                        }

                        for (let i = xmin; i <= xmax; i++){
                            for (let j = ymin; j <= ymax; j++){
                                grid[i][j] = "T"
                            }
                        }

                        tables.push(<Table xmin={xmin * 150} ymin={ymin * 150} xmax={xmax * 150} ymax={ymax * 150}/>);
                        return "";
                    });

                    jsonSeats.map(s => {
                        let xcoord = parseInt(s.xcoord / 150);
                        let ycoord = parseInt(s.ycoord / 150);

                        let findGrid = true;
                        let count = 1;
                        while (findGrid){
                            let xtemp = xcoord;
                            let ytemp = ycoord;

                            if (count % 4 === 1){
                                xtemp += parseInt(count / 4);
                            }
                            else if (count % 4 === 2) {
                                xtemp -= parseInt(count / 4);
                            }
                            else if (count % 4 === 3) {
                                ytemp += parseInt(count / 4);
                            }
                            else if (count % 4 === 0) {
                                ytemp -= parseInt(count / 4);
                            }

                            if (xtemp < 0){
                                xtemp = 0;
                            }
                            if (ytemp < 0){
                                ytemp = 0;
                            }

                            if (grid[xtemp][ytemp] === undefined) {
                                xcoord = xtemp;
                                ycoord = ytemp;
                                findGrid = false;
                            }
                            count++;
                        }

                        totalSeats++;
                        if (s.occupied === "true"){
                            grid[xcoord][ycoord] = "OS";
                            occupiedSeats++;
                        }
                        else {
                            grid[xcoord][ycoord] = "US";
                        }

                        seats.push(<Seat xcoord={xcoord * 150} ycoord={ycoord * 150} occupied={s.occupied}/>);
                        return "";
                    });

                    let occupancyPercent = (occupiedSeats / totalSeats) * 100;
                    let occupancyState = "unoccup";
                    if (occupancyPercent >= 50){
                        occupancyState = "occup";
                    }

                    this.setState({seats: seats, tables: tables, doors: doors, totalSeats: totalSeats,
                                         occupiedSeats: occupiedSeats, occupancyPercent: occupancyPercent,
                                         occupancyState: occupancyState, loading: false});
            });

        let mapCol = document.querySelector('#map-col');
        this.setState({stageWidth: mapCol.offsetWidth, stageHeight: mapCol.offsetHeight/1.5});
        window.addEventListener("resize", this.updateWidth.bind(this));
    }

    render() {
        return (
            <div id="map-page">
                <h1 id="title">Seat Map</h1>
                <h3 id="location">Andrew's Kitchen</h3>

                <div className="container" id="map-container">
                    <div className="row">
                        <div id="map-col" className="col-12">
                            <Loading
                                show={this.state.loading}
                                color="#00bdcc"
                            />
                            <Stage width={this.state.stageWidth} height={this.state.stageHeight} draggable={true}
                                   onWheel={this.handleWheel} scaleX={this.state.stageScale} scaleY={this.state.stageScale}
                                   x={this.state.stageX} y={this.state.stageY}
                            >
                                <Layer>
                                    {this.state.tables}
                                    {this.state.seats}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                </div>
                <div className="container" id="data-container">
                    <div className="row">
                        <div className="col-3">
                            <h5># of Seats</h5>
                        </div>
                        <div className="col-3">
                            <h5># of Unoccupied Seats</h5>
                        </div>
                        <div className="col-3">
                            <h5># of Occupied Seats </h5>
                        </div>
                        <div className="col-3">
                            <h5>Occupancy Percentage</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <p id="total-num">{this.state.totalSeats}</p>
                        </div>
                        <div className="col-3">
                            <p className="unoccup">{this.state.totalSeats - this.state.occupiedSeats}</p>
                        </div>
                        <div className="col-3">
                            <p className="occup">{this.state.occupiedSeats}</p>
                        </div>
                        <div className="col-3">
                            <p className={this.state.occupancyState}>{this.state.occupancyPercent}%</p>
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
            stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    };

    updateWidth () {
        let mapCol = document.querySelector('#map-col');
        this.setState({stageWidth: mapCol.offsetWidth});
    }
}

export default SeatMap;