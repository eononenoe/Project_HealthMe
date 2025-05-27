import React from 'react';

const CardBar = ({ name, color, percent, onClick }) => {
    return (
        <div className="card-bar" onClick={onClick}>
            <div className="bar-label">
                {name}<span className="bar-percent">{percent}%</span>
            </div>
            <div className="bar-container">
                <div className={`bar-inner ${color}`}>
                    <div className="indicator" style={{ left: `${percent}%` }} />
                </div>
            </div>
            <div className="card-bar-label">
                <li>부족</li>
                <li>과다</li>
            </div>
        </div>
    );
};

export default CardBar;