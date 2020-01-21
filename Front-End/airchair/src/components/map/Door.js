import React from "react";

import door from "../../resources/images/DoorSwing.png"

function Door (props){

    let doorStyle = {
        width: "100px",
        height: "100px"
    };

    if (props.corner == "TL"){

    }
    return (
        <div>
            <img src={door} alt="door" style={doorStyle}/>
        </div>
    );
}

export default Door