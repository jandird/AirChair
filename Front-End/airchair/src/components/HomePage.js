import React from 'react'
import Dropdown from 'react-dropdown';
import { Link, animateScroll as scroll } from "react-scroll";

import 'react-dropdown/style.css';
import "../resources/css/HomePage.css"

import AirChair from '../resources/images/AirChair.png'

class HomePage extends React.Component {
    render() {
        const options = [
            'McMaster University - Thode - Group Meeting Room 1'
        ];
        // const defaultOption = options[0];

        return(
            <div id="home-page">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <img src={AirChair} alt="AirChair"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Dropdown className="dropdown" options={options} onChange={this._onSelect} placeholder="Select a Location" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Link activeClass="active" className="start-link" to="seat-map" spy={true} smooth={true} duration={500}>
                                <button id="open-seats-button">Find Open Seats</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;