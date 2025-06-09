import React from 'react';

const NutrientInfo = ({ nutrient }) => {
    if (!nutrient) {
        return (
            <div className="info-container">
                <h2>영양소</h2>
                <p>클릭해서 설명을 볼 수 있습니다.</p>
            </div>
        );
    }

    const { name, value, desc, tip, foods } = nutrient;

    const percentText = typeof value === 'number' ? `${value}%` : `${value ?? '-'}%`;
    const displayDesc = desc?.trim() || '설명을 불러올 수 없습니다.';

    // 공백이거나 undefined/null도 걸러냄
    const hasTip = typeof tip === 'string' && tip.trim().length > 0;
    const hasFoods = Array.isArray(foods) && foods.some(f => f && f.trim().length > 0);

    return (
        <div className="info-container">
            <h2>{name}</h2>
            <p><strong>{percentText}</strong></p>

            <p>{displayDesc}</p>

            <div className='desc-box'>
                <p>개선 팁</p>
                <p>
                    {hasTip ? tip.trim() : <span style={{ color: 'gray' }}>개선 팁이 없습니다.</span>}
                </p>
            </div>

            <div className='desc-box'>
                <p>추천 식품</p>
                <p>
                    {hasFoods ? foods.filter(f => f.trim()).join(', ') : <span style={{ color: 'gray' }}>추천 식품 없음</span>}
                </p>
            </div>
        </div>
    );
};

export default NutrientInfo;
