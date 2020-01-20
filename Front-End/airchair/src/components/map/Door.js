import React from "react";

import door from "../../resources/images/DoorSwing.png"

function Door (props){

    let doorStyle = {
        width: "50px",
        height: "50px"

    };
    return (
        <div>
            <img src={door} alt="door" style={doorStyle}/>
        </div>
    );
}

export default Door