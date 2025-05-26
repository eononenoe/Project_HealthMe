import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Result.css';

import CardBar from './CardBar';
import NutrientInfo from './NutrientInfo';
import InfluenceIcon from './InfluenceIcon';
import TraitsSection from './TraitsSection';

const ResultPage = () => {
  const [indicatorPercents, setIndicatorPercents] = useState([]);
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

    axios.get("http://localhost:8090/api/result/indicator")
      .then(res => setIndicatorPercents(res.data))
      .catch(err => console.error("퍼센트 API 호출 실패", err));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nutrientCards = [
    { name: "탄수화물", value: "55%", desc: "탄수화물은 에너지 공급에 중요합니다.", color: "blue" },
    { name: "단백질", value: "52%", desc: "단백질은 근육 형성과 면역 유지에 중요합니다.", color: "yellow" },
    { name: "지방", value: "78%", desc: "지방은 에너지원으로 활용되며 지용성 비타민의 흡수를 돕습니다.", color: "green" },
    { name: "비타민", value: "43%", desc: "비타민은 몸의 대사 기능과 면역 체계를 유지합니다.", color: "purple" },
    { name: "아이오딘", value: "90%", desc: "아이오딘은 갑상선 호르몬의 구성 성분입니다.", color: "red" },
    { name: "철분", value: "47%", desc: "철분은 산소 운반을 돕는 미네랄입니다.", color: "teal" },
  ];

  const influenceIcons = [
    { label: "예시1", desc: "이것은 예시1에 대한 설명입니다.", color: "#3d9dbf", img: "https://cdn.pixabay.com/photo/2025/04/23/01/35/bird-9551361_1280.jpg", colorClass: "blue" },
    { label: "예시2", desc: "이것은 예시2에 대한 설명입니다.", color: "#e4b322", img: "", colorClass: "yellow" },
    { label: "예시3", desc: "이것은 예시3에 대한 설명입니다.", color: "#2aaf74", img: "", colorClass: "green" },
    { label: "예시4", desc: "이것은 예시4에 대한 설명입니다.", color: "#a672c2", img: "", colorClass: "purple" },
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
            {nutrientCards.map((card, idx) => (
              <CardBar
                key={idx}
                {...card}
                percent={indicatorPercents[idx] || 0}
                onClick={setSelectedNutrient}
              />
            ))}
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
