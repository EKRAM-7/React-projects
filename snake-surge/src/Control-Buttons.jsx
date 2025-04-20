import React from "react";

function ControlButtons({onButtonClick}) {
    return (
        <div className="control-buttons">
            <button id="up" className="btn" onClick={() => onButtonClick("up")}>🔼</button>
            <button id="left" className="btn" onClick={() => onButtonClick("left")}>◀️</button>
            <button id="down" className="btn" onClick={() => onButtonClick("down")}>🔽</button>
            <button id="right" className="btn" onClick={() => onButtonClick("right")}>▶️</button>
        </div>
    )
}


export default ControlButtons;