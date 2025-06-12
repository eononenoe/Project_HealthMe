import React from 'react';

const CardBar = ({ name, percent, onClick }) => {
    // 퍼센트에 따라 색상 클래스 동적으로 결정
    const getColorClass = (percent) => {
        if (percent <= 20) return 'red';
        if (percent <= 40) return 'orange';
        if (percent <= 60) return 'yellow';
        if (percent <= 80) return 'green';
        return 'blue';
    };

    const colorClass = getColorClass(percent);

    return (
        <div className="card-bar" onClick={onClick}>
            <div className="bar-label">
                {name} <span className="bar-percent">{percent}%</span>
            </div>
            <div className="bar-container">
                {/* 퍼센트만큼 차오르고 색상도 포함 */}
                <div className={`bar-inner ${colorClass}`} style={{ width: `${percent}%` }} />

                {/* 인디케이터에도 색상 적용 */}
                <div className={`indicator ${colorClass}`} style={{ left: `${percent}%` }} />
            </div>
            <div className="card-bar-label">
                <li>부족</li>
                <li>충분</li>
            </div>
        </div>
    );
};

export default CardBar;
