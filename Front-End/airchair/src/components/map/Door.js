import React from "react";

import door from "../../resources/images/DoorSwing.png"

function Door (props){

    let doorStyle = {
        position: "absolute",
        width: "100px",
        height: "100px",
        left: "93.8%",
        top: "500px"
    };

    if (props.direct === "L"){
        doorStyle.transform = "rotate(-90deg)";
    }

    return (
        <div>
            <img src={door} alt="door" style={doorStyle}/>
        </div>
    );
}

export default Door