import React from 'react';
import Dropdown from 'react-dropdown';
import { Link } from "react-scroll";

import SeatMap from "./components/map/SeatMap";
import Feedback from "./components/Feedback";

import 'react-dropdown/style.css';
import "./resources/css/HomePage.css"

import AirChair from './resources/images/AirChairRev0.png'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loc: null,
            options: [
                "Andrew's Kitchen"
            ]
        };

        this.updateLoc = this.updateLoc.bind(this);
    }

    render(){
        console.log(this.state.loc);
        return (
            <div className="App">
                <div id="home-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <img src={AirChair} alt="AirChair"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Dropdown className="dropdown" options={this.state.options}
                                          onChange={this.updateLoc}
                                          value={this.state.loc}
                                          placeholder="Select a Location"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Link activeClass="active" className="start-link" to="map-page" spy={true} smooth={true} duration={500}>
                                    <button id="open-seats-button" onClick={() => this.updateLoc()}>Find Open Seats</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <SeatMap/>
                <Feedback/>
            </div>
        );
    }

    updateLoc(loc){
        this.setState({loc: loc});
    }
}

export default App;
