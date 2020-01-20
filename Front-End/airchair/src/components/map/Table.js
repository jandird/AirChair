import React from 'react'

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
        <div style={tableStyle}/>
    );
}

export default Table;