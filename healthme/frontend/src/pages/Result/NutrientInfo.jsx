import React from 'react';

const NutrientInfo = ({ nutrient }) => {
    if (!nutrient) return (
        <div className="info-container">
            <h2>영양소</h2>
            <p><span>- %</span></p>
            <p>설명창입니다.</p>
        </div>
    );

    const { name, value, desc } = nutrient;

    // 퍼센트 값이 숫자 or 숫자 문자열이면 정제
    const percentText = typeof value === 'number'
        ? `${value}%`
        : typeof value === 'string' && value.includes('%')
        ? value
        : `${value ?? '-'}%`;

    return (
        <div className="info-container">
            <h2>{name}</h2>
            <p><span>{percentText}</span></p>
            <p>{desc ?? '설명을 불러올 수 없습니다.'}</p>
        </div>
    );
};

export default NutrientInfo;
