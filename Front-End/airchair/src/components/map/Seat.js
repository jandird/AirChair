import React from 'react'
import {Circle} from 'react-konva';

function Seat (props){

    let color;
    if (props.occupied === "true"){
        color = "#ff1744";
    }
    else {
        color = "#1de9b6";
    }

    return (
        <Circle x={props.xcoord} y={props.ycoord} radius={75} fill={color} />
    );
}

export default Seat;