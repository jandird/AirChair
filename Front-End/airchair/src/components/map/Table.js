import React from 'react'
import {Rect} from 'react-konva'

function Table (props){
    let tableStyle = {
        position: "absolute",
        top: props.ymin + "px",
        left: props.xmin + "px",
        width: (props.xmax - props.xmin) + "px",
        height: (props.ymax - props.ymin) + "px",
        backgroundColor: "#FFFFFF",
        borderRadius: "25px"
    };

    return (
        <Rect
            x={props.xmin}
            y={props.ymin}
            width={Math.abs(props.xmax - props.xmin)}
            height={Math.abs(props.ymax - props.ymin)}
            fill="#FFFFFF"
            cornerRadius={25}
        />
    );
}

export default Table;