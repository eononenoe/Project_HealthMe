import React, { useEffect } from 'react';
import 'static/css/pages/Question.css'; // CSS import
import '@mui/icons-material/Check'; // Google Icons 사용 시 필요
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const NutritionSurvey = () => {
    useEffect(() => {
        const groups = document.querySelectorAll('.options');

        groups.forEach((group) => {
            const buttons = group.querySelectorAll('.circle');
            const question = group.previousElementSibling;

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(b => b.classList.remove('selected'));
                    button.classList.add('selected');
                    group.classList.add('faded');
                    if (question && question.classList.contains('question')) {
                        question.classList.add('faded');
                    }
                });
            });
        });
    }, []);

    return (
        <div>
            {/* HEADER */}
            <div id="header"></div>

            <section className="hero">
                <h1>나의 건강은?</h1>
                <p>HealthMe Project<sup>®</sup></p>

                <section className="question-card-container">
                    <div className="card">
                        <div className="card-top">
                            <img src="https://www.16personalities.com/static/images/test-header-2.svg" alt="아이콘1" />
                        </div>
                        <div className="card-content">
                            <p>여러분의 영양 상태를 빠르게 진단할 수 있도록 간단한 설문에 응답해 주세요.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-top">
                            <img src="https://www.16personalities.com/static/images/academy/explorers/icons/theory.svg" alt="아이콘2" />
                        </div>
                        <div className="card-content">
                            <p>설문 결과를 바탕으로 현재 부족한 영양소를 정확하게 분석해 드립니다.</p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-top">
                            <img src="https://www.16personalities.com/static/images/academy/analysts/exercise.svg" alt="아이콘3" />
                        </div>
                        <div className="card-content">
                            <p>부족한 영양소를 보완할 수 있는 맞춤 식단과 제품을 추천해 드려요.</p>
                        </div>
                    </div>
                </section>
            </section>

            {/* QUESTIONS */}
            <div className="question-block">
                {questions.map((q, index) => (
                    <div key={index}>
                        <p className="question">{q.text}</p>
                        <div className="options">
                            <span className="label agree">그렇다</span>
                            {[...Array(7)].map((_, i) => (
                                <button key={i} className={`circle ${getColor(i)}`}>
                                    <span className="material-symbols-outlined">check</span>
                                </button>
                            ))}
                            <span className="label disagree">그렇지 않다</span>
                        </div>
                    </div>
                ))}

                <button className="next-button">
                    결과 확인하기 <span><ArrowForwardIosIcon /></span>
                </button>
            </div>

            <div id="footer"></div>
        </div>
    );
};

const getColor = (index) => {
    if (index < 3) return 'green';
    if (index === 3) return 'gray';
    return 'purple';
};

// 질문 리스트는 외부 JSON이나 상태로 관리할 수 있음
const questions = [
    { text: "육류, 달걀, 콩, 유청 등 단백질 식품을 하루 한 끼도 섭취하지 않는 날이 많다." },
    { text: "근력이 줄거나 체력이 떨어져 쉽게 피로함을 느낀다." },
    { text: "운동 후 회복이 느리고, 몸이 쉽게 지친다." },
    { text: "피로하거나 집중력이 떨어지는 일이 자주 있다." },
    { text: "어지럽거나 창백해 보인다는 말을 듣는 편이다." },
    { text: "철분이 풍부한 식품(소고기, 간, 시금치 등)을 잘 챙겨 먹지 않는다." },
    { text: "하루 종일 실내에만 있는 날이 많다." },
    { text: "햇볕을 쬘 기회가 거의 없다." },
    { text: "비타민 D가 풍부한 식품(등푸른 생선, 버섯 등)을 잘 먹지 않는다." },
    { text: "우유, 치즈 등 유제품을 거의 먹지 않는다." },
    { text: "뼈나 관절이 뻐근하거나 약해진 느낌이 든다." },
    { text: "채소, 과일, 해조류를 하루 1회 이하로만 섭취한다." },
    { text: "배변 활동이 불규칙하거나 불편한 날이 많다." },
    { text: "눈 떨림, 근육 경련을 자주 경험한다." },
    { text: "스트레스를 자주 느끼고, 몸이 긴장된 느낌이 든다." },
    { text: "자극적 음식(짠 음식, 인스턴트)을 주 3회 이상 섭취한다." },
    { text: "바나나, 감자, 아보카도 등 칼륨이 풍부한 식품을 거의 먹지 않는다." },
    { text: "머리카락이 빠지거나 손톱이 약해지고 갈라진다." },
    { text: "피부가 푸석하고 거칠어진 느낌이 든다." },
    { text: "상처가 잘 낫지 않거나, 입안이 자주 헌다." },
    { text: "감기에 잘 걸리거나 면역력이 떨어진 것 같다." },
    { text: "운동 후 회복이 느리고 체력이 떨어졌다고 느낀다." },
    { text: "혈액순환이 안 되는 느낌이 들고 손발이 차다." },
];

export default NutritionSurvey;
