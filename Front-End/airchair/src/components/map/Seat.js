import React from 'react'
import {Circle} from 'react-konva';

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

    let color;
    if (props.occupied === "true"){
        color = "#ff1744";
    }
    else {
        color = "#1de9b6";
    }

    return (
        <Circle x={props.xcoord} y={props.ycoord} radius={25} fill={color} />
    );
}

export default Seat;