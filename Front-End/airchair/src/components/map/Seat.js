import React from 'react'
import {Circle, Rect} from 'react-konva';

function Seat (props){

    let color;
    let seat;
    if (props.occupied === "true"){
        color = "#ff1744";
        seat = <Rect x={props.xcoord - 75} y={props.ycoord -75} width={150} height={150} fill={color} cornerRadius={25} />
    }
    else {
        color = "#1de9b6";
        seat =  <Circle x={props.xcoord} y={props.ycoord} radius={75} fill={color} />
    }

    return (
        seat
    );
}

export default Seat;