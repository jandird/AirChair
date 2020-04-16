import React from 'react';
import Modal from 'react-modal';

import feedbackRef from "../components/firebase/firebase.js"

import "../resources/css/Feedback.css"

import thumbsUp from "../resources/images/thumbs-up.png"
import thumbsDown from "../resources/images/thumbs-down.png"
import Dropdown from "react-dropdown";

class Feedback extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            badOpen: false,
            badDesc: null,
            feedbackOpen: false,
            showButtons: {
                display: "flex"
            },
            showMessage: {
                display: "none"
            },
            goodBar: {
                width: '50%',
                height: '35px',
                backgroundColor: '#1de9b6'
            },
            badBar: {
                width: '50%',
                height: '35px',
                backgroundColor: '#ff1744'
            },
            goodCount: 0,
            badCount: 0,
            prevFeedback: null
        };

        this.openBadModal = this.openBadModal.bind(this);
        this.closeBadModal = this.closeBadModal.bind(this);
        this.openFeedbackModal = this.openFeedbackModal.bind(this);
        this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
        this.updateDesc = this.updateDesc.bind(this);
        this.feedbackReceived = this.feedbackReceived.bind(this);

        this.readData = this.readData.bind(this);
        this.updateFeedback = this.updateFeedback.bind(this)
    }

    componentDidMount() {
        this.readData(this.updateFeedback)
    }

    readData(callback){
        let ref = feedbackRef.child('/andrew-kitchen');
        ref.on('value', function(snapshot) {
            let goodCount = 0;
            let badCount = 0;
            let prevFeedback = [];

            snapshot.forEach(function(childSnapshot) {
                let childData = childSnapshot.val();

                if (childData.type === 1){
                    goodCount++;
                }
                else {
                    badCount++;
                    prevFeedback.push(
                        <tr>
                            <td>{childData.description}</td>
                            <td>{childData.date}</td>
                        </tr>)
                }
            });
            callback(goodCount, badCount, prevFeedback);
        });

    }

    updateFeedback(goodCount, badCount, prevFeedback){
        prevFeedback = prevFeedback.reverse();
        let goodPercent = (goodCount / (goodCount + badCount)) * 100;
        let badPercent = 100 - goodPercent;

        this.setState({
            goodCount: goodCount,
            badCount: badCount,
            prevFeedback: prevFeedback,
            goodBar: {
                width: goodPercent + '%',
                height: '35px',
                backgroundColor: '#1de9b6'
            },
            badBar: {
                width: badPercent + '%',
                height: '35px',
                backgroundColor: '#ff1744'
            }
        });
    }

    openBadModal(){
        this.setState({badOpen: true})
    }

    closeBadModal(){
        this.setState({badOpen: false})
    }

    openFeedbackModal(){
        this.setState({feedbackOpen: true})
    }

    closeFeedbackModal(){
        this.setState({feedbackOpen: false})
    }

    updateDesc(desc){
        this.setState({badDesc: desc});
    }

    feedbackReceived(good){
        let date = new Date().toLocaleString();
        if (good){
            feedbackRef.child("/andrew-kitchen").push("/andrew-kitchen").set({type: 1, date: date, description: null});
            this.setState({showButtons: {display: "none"}, showMessage: {display: "block", color: "#1de9b6"}});
        }
        else {
            feedbackRef.child("/andrew-kitchen").push().set({type: 0, date: date, description: this.state.badDesc.value});
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
                        id="bad-modal" isOpen={this.state.badOpen} onRequestClose={this.closeBadModal} contentLabel="Negative Modal">
                        <Dropdown className="feedback-dropdown"
                                  options={options}
                                  onChange={this.updateDesc}
                                  value={this.state.badDesc}
                                  placeholder="What went wrong?"
                        />
                        <button className="modal-button" onClick={() => this.feedbackReceived(false)}> Submit </button>
                    </Modal>
                    <div className="row" style={this.state.showMessage}>
                        <div className="col-12">
                            <h4>Thank You for the Feedback!</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <button id="prev-feedback" onClick={this.openFeedbackModal}> View Previous Feedback </button>
                        </div>
                    </div>
                    <Modal id="feedback-modal" isOpen={this.state.feedbackOpen} onRequestClose={this.closeFeedbackModal} contentLabel="Feedback Modal">
                        <div className="container">
                            <div className="row">
                                <h4> Previously Received Feedback </h4>
                            </div>
                            <div className="row">
                                <div style={this.state.goodBar}>
                                    <h5>{this.state.goodCount}</h5>
                                </div>
                                <div style={this.state.badBar}>
                                    <h5>{this.state.badCount}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-1">
                                    <img className="modal-img" src={thumbsUp} alt="thumbsUp"/>
                                </div>
                                <div className="col-10"/>
                                <div className="col-1">
                                    <img className="modal-img" src={thumbsDown} alt="thumbsDown"/>
                                </div>
                            </div>
                            <div className="row">
                               <table className="table">
                                   <thead>
                                       <tr>
                                           <th> Description </th>
                                           <th> Date </th>
                                       </tr>
                                   </thead>
                                   <tbody>
                                        {this.state.prevFeedback}
                                   </tbody>
                               </table>
                            </div>
                            <div className="row">
                                <button className="modal-button" onClick={this.closeFeedbackModal}> Close </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }

}

export default Feedback;