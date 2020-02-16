import React from 'react'
import {Rect} from 'react-konva'

function Table (props){

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