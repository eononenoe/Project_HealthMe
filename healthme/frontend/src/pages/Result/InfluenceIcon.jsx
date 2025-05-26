import React from 'react';

const InfluenceIcon = ({ icon, onClick }) => {
    return (
        <div
            className="nutirent-icon-container"
            onClick={() => onClick(icon)}
        >
            <div className={`icon-box ${icon.colorClass}`}>
                <img src={icon.img} alt={icon.label} />
            </div>
            <p>{icon.label}</p>
        </div>
    );
};

export default InfluenceIcon;
