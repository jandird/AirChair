import React from 'react'

function Seat (props){

    let size = 50;
    let xcen = props.xcoord - size/2;
    let ycen = props.ycoord - size/2;
    let seatStyle = {
        position: "absolute",
        top: ycen,
        left: xcen,
        width: size,
        height: size,
        borderRadius: "50%"
    };

    if (props.occupied){
        seatStyle.backgroundColor = "#ff1744";
    }
    else {
        seatStyle.backgroundColor = "#1de9b6";
    }

    return (
        <div style={seatStyle}/>
    );
}

export default Seat;