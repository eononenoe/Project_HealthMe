import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Result.css';

import CardBar from './CardBar';
import NutrientInfo from './NutrientInfo';
import InfluenceIcon from './InfluenceIcon';
import TraitsSection from './TraitsSection';

const ResultPage = () => {
  const [resultMap, setResultMap] = useState({});
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const image = document.querySelector('.header-image img');
      if (image) {
        image.style.transform = `translateY(${window.scrollY * 0.7}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    // [예시 점수] - 추후 설문결과 기반으로 바뀔 예정
    const scores = {
      "탄수화물": 20,
      "단백질": 22,
      "지방": 27,
      "비타민": 9,
      "아이오딘": 8,
      "철분": 2
    };

    axios.post("http://localhost:8090/healthme/result/summary", scores)
      .then(res => {
        console.log("백엔드 응답:", res.data);
        setResultMap(res.data);
      })
      .catch(err => console.error("요약 결과 호출 실패", err));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nutrientCards = [
    { name: "탄수화물", color: "blue" },
    { name: "단백질", color: "yellow" },
    { name: "지방", color: "green" },
    { name: "비타민", color: "purple" },
    { name: "아이오딘", color: "red" },
    { name: "철분", color: "teal" },
  ];

  const influenceIcons = [
    { label: "예시1", desc: "이것은 예시1에 대한 설명입니다.", color: "#3d9dbf", img: "https://cdn.pixabay.com/photo/2025/04/23/01/35/bird-9551361_1280.jpg", colorClass: "blue" },
    { label: "예시2", desc: "이것은 예시2에 대한 설명입니다.", color: "#e4b322", img: "null", colorClass: "yellow" },
    { label: "예시3", desc: "이것은 예시3에 대한 설명입니다.", color: "#2aaf74", img: "null", colorClass: "green" },
    { label: "예시4", desc: "이것은 예시4에 대한 설명입니다.", color: "#a672c2", img: "null", colorClass: "purple" },
  ];

  return (
    <div className="result-page">
      <div className="result-header">
        <div className="header-main">
          <div className="header-text">
            <h1>당신만을 위한 건강 분석</h1>
            <p>개인 특성과 맞춤 영양소 기반 리포트를 제공합니다.</p>
          </div>
          <div className="header-image">
            <img src="/img/resultHeader.png" alt="개인 목표 이미지" />
          </div>
        </div>
        <div className="wave-divider">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#ffffff"
              d="M0,160 C240,-120 480,440 720,160 C960,-120 1200,440 1440,160 L1440,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>

      <div className="contents-main">
        <div className="title1"><h1>영양소 정보</h1></div>
        <div className="card-container">
          <div className="left">
            {nutrientCards.map((card, idx) => {
              const result = resultMap[card.name];
              if (!result) return null;

              return (
                <CardBar
                  key={idx}
                  name={card.name}
                  color={card.color}
                  percent={result.percent}
                  onClick={() =>
                    setSelectedNutrient({
                      name: card.name,
                      value: result.percent,
                      desc: result.description,
                      color: card.color
                    })
                  }
                />
              );
            })}
          </div>
          <div className="right">
            <NutrientInfo nutrient={selectedNutrient} />
          </div>
        </div>

        <div className="title"><h1>영향을 미치는 특성</h1></div>
        <div className="card-nutrient-result">
          <div className="icon-group">
            {influenceIcons.map((icon, idx) => (
              <InfluenceIcon key={idx} icon={icon} onClick={setSelectedIcon} />
            ))}
          </div>
          <div className="dd" style={{ borderTop: selectedIcon ? `4px solid ${selectedIcon.color}` : 'none' }}>
            <p>{selectedIcon?.desc || "무슨 내용을 넣지"}</p>
          </div>
        </div>

        <div className="title"><h1>강점</h1></div>
        <TraitsSection type="good" />

        <div className="title"><h1>약점</h1></div>
        <TraitsSection type="bad" />

        <button className="next-button">
          추천 페이지
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
