import React from 'react';
import Modal from 'react-modal';

import "../resources/css/Feedback.css"

import thumbsUp from "../resources/images/thumbs-up.png"
import thumbsDown from "../resources/images/thumbs-down.png"
import Dropdown from "react-dropdown";

class Feedback extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            badOpen: false,
            goodOpen: false,
            showButtons: {
                display: "flex"
            },
            showMessage: {
                display: "none"
            }
        };

        this.openBadModal = this.openBadModal.bind(this);
        this.closeBadModal = this.closeBadModal.bind(this);
        this.feedbackReceived = this.feedbackReceived.bind(this);
    }


    openBadModal(){
        this.setState({badOpen: true})
    }

    closeBadModal(){
        this.setState({badOpen: false})
    }

    feedbackReceived(good){
        if (good){
            this.setState({showButtons: {display: "none"}, showMessage: {display: "block", color: "#1de9b6"}})
        }
        else {
            this.closeBadModal();
            this.setState({showButtons: {display: "none"}, showMessage: {display: "block", color: "#ff1744"}})
        }
    }

    render(){
        const options = [
            "Chair not placed correctly or does not exist.",
            "Chair that exists not shown on map",
            "Chair marked as occupied that was not occupied.",
            "Chair not marked as occupied that was occupied.",
            "Table not placed correctly or does not exist.",
            "Table that exists not shown on map."
        ];

        return (
            <div id="feedback-page">
                <div className="container">
                    <div className="row" style={this.state.showButtons}>
                        <div className="col-12">
                            <h4> How did we do? </h4>
                        </div>
                    </div>
                    <div className="row" style={this.state.showButtons}>
                        <div className="col-3"/>
                        <div className="col-3">
                            <button className="feedback-btn" onClick={() => this.feedbackReceived(true)}>
                                <img src={thumbsUp} alt="thumbs up" className="feedback-img"/>
                            </button>
                        </div>
                        <div className="col-3">
                            <button className="feedback-btn" onClick={this.openBadModal}>
                                <img src={thumbsDown} alt="thumbs down" className="feedback-img"/>
                            </button>
                        </div>
                        <div className="col-3"/>
                    </div>
                    <Modal
                        id="bad"
                        isOpen={this.state.badOpen}
                        onRequestClose={this.closeBadModal}
                        contentLabel="Example Modal"
                    >
                        <h5>What went wrong?</h5>
                        <Dropdown className="feedback-dropdown" options={options} onChange={this._onSelect} placeholder="Select a Location" />
                        <button id="submit" onClick={() => this.feedbackReceived(false)}> Submit </button>

                    </Modal>
                    <div className="row" style={this.state.showMessage}>
                        <div className="col-12">
                            <h4>Thank You for the Feedback!</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Feedback;