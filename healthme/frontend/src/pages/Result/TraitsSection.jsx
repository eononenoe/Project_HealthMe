import React from 'react';

const TraitsSection = ({ type }) => {
  const isGood = type === 'good';
  const iconSrc = isGood ? '/img/check_circle.svg' : '/img/error.svg';

  return (
    <div className="traits-container">
      {[0, 1].map(row => (
        <div className="traits-row" key={row}>
          {[0, 1].map(col => (
            <div className="trait" key={col}>
              <div className={`icon ${type}`}>
                <img src={iconSrc} alt="trait-icon" />
              </div>
              <div className="trait-content">
                <p>지적 자극을 제공하는 성격</p>
                <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TraitsSection;
