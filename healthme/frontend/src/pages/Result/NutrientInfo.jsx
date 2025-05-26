import React from 'react';

const NutrientInfo = ({ nutrient }) => {
    if (!nutrient) return (
        <div className="info-container">
            <h2>영양소</h2>
            <p><span>%</span></p>
            <p>설명창입니다.</p>
        </div>
    );

    return (
        <div className="info-container">
            <h2>{nutrient.name}</h2>
            <p><span>{nutrient.value}</span></p>
            <p>{nutrient.desc}</p>
        </div>
    );
};

export default NutrientInfo;
