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
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const image = document.querySelector('.header-image img');
      if (image) {
        image.style.transform = `translateY(${window.scrollY * 0.7}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const userid = loginUser?.userid;

    axios.get("http://localhost:8090/healthme/survey/scores", {
      params: { userid },
      withCredentials: true
    })
      .then(res => {
        const scores = res.data;
        return Promise.all([
          axios.post("http://localhost:8090/healthme/result/summary", scores, { withCredentials: true }),
          axios.post("http://localhost:8090/healthme/recommend", scores, { withCredentials: true })
        ]);
      })
      .then(([summaryRes, recommendRes]) => {
        setResultMap(summaryRes.data);
        setRecommendations(recommendRes.data);
      })
      .catch(err => {
        console.error("요약/추천 API 실패", err);
      });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nutrientCards = [
    { name: "단백질", color: "red" },
    { name: "철분", color: "brown" },
    { name: "비타민 D", color: "yellow" },
    { name: "칼슘", color: "indigo" },
    { name: "식이섬유", color: "green" },
    { name: "마그네슘", color: "purple" },
    { name: "칼륨", color: "orange" },
    { name: "비오틴", color: "pink" },
    { name: "아연", color: "teal" },
    { name: "아르기닌", color: "blue" }
  ];

  const influenceIcons = [
    { label: "축산물", desc: "이것은 예시1에 대한 설명입니다.", color: "#3d9dbf", img: "/img/categoryMeat.jpg", colorClass: "blue" },
    { label: "농산물", desc: "이것은 예시2에 대한 설명입니다.", color: "#e4b322", img: "/img/categoryVegetable.jpg", colorClass: "yellow" },
    { label: "수산물", desc: "이것은 예시3에 대한 설명입니다.", color: "#2aaf74", img: "/img/categorySeafood.jpg", colorClass: "green" },
    { label: "유제품", desc: "이것은 예시4에 대한 설명입니다.", color: "#a672c2", img: "/img/categoryEtc.jpg", colorClass: "purple" }
  ];

  const filtered = selectedIcon
    ? recommendations.filter(r => r.category === selectedIcon.label).slice(0, 2)
    : recommendations.slice(0, 2);

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
            <path fill="#ffffff" d="M0,160 C240,-120 480,440 720,160 C960,-120 1200,440 1440,160 L1440,320 L0,320 Z" />
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
                      tip: result.tip,
                      foods: result.foods,
                      info: result.info
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

        <div className="title"><h1>추천 재료</h1></div>
        <div className="card-nutrient-result">
          <div className="icon-group">
            {influenceIcons.map((icon, idx) => (
              <InfluenceIcon key={idx} icon={icon} onClick={setSelectedIcon} />
            ))}
          </div>
          <div className="recommend-box" style={{ borderTop: selectedIcon ? `4px solid ${selectedIcon.color}` : `4px solid gainsboro` }}>
            {filtered.map((item, idx) => (
              <button className='recommend-btn'>
                <div className='recommend-food' key={idx}>
                  <div className='recommend-img'>
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                  <div className='recommend-name'>{item.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="title"><h1>영양소 상식</h1></div>
        <TraitsSection type="nutrient-info" />

        <div className="title"><h1>오늘의 건강 팁</h1></div>
        <TraitsSection type="today-tip" />

        <button className="next-button">
          추천 페이지
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
