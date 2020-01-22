import React from 'react'

function Seat (props){

    let size = 50;
    let xcen = props.xcoord - size/2;
    let ycen = props.ycoord - size/2;
    let seatStyle = {
        position: "absolute",
        display: "flex",
        top: ycen,
        left: xcen,
        width: size,
        height: size,
        borderRadius: "50%"
    };

    console.log(props.occupied);
    if (props.occupied === "true"){
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