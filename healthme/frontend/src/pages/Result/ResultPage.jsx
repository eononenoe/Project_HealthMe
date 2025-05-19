import 'static/css/pages/Result.css';
import React, { useEffect } from 'react';
import axios from 'axios';


const ResultPage = () => {
    useEffect(() => {
        // 1. 스크롤 이벤트
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const image = document.querySelector(".header-image img");
            if (image) {
                image.style.transform = `translateY(${scrollY * 0.9}px)`;
            }
        };
        window.addEventListener("scroll", handleScroll);

        //  2. 백엔드에서 영양소 퍼센트 API 호출
        axios.get("http://localhost:8090/api/result/indicator")
            .then(res => {
                const percentValues = res.data;
                const indicators = document.querySelectorAll('.indicator');
                indicators.forEach((indicator, idx) => {
                    const percent = percentValues[idx] || 0;
                    indicator.style.left = `${percent}%`;
                });
            })
            .catch(err => {
                console.error("영양소 퍼센트 API 호출 실패", err);
            });

        // 3. 카드 클릭 시 설명 업데이트
        // axios.get("http://localhost:8090/api/result/nutrientResult")
        document.querySelectorAll('.card-bar').forEach(bar => {
            bar.addEventListener('click', () => {
                const name = bar.dataset.name;
                const value = bar.dataset.value;
                const desc = bar.dataset.desc;

                document.getElementById('nutrient-name').textContent = name;
                document.getElementById('nutrient-value').textContent = value;
                document.getElementById('nutrient-desc').textContent = desc;
            });
        });

        // 4. 아이콘 클릭 시 설명 및 색상 업데이트
        document.querySelectorAll('.nutirent-icon-container').forEach(container => {
            container.addEventListener('click', () => {
                const desc = container.dataset.desc;
                const color = container.dataset.color;

                document.getElementById('icon-desc').textContent = desc;
                const ddBox = document.querySelector('.dd');
                if (ddBox) {
                    ddBox.style.borderTop = `4px solid ${color}`;
                }
            });
        });

        // 5. 이벤트 제거
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <>
            {
                <>
                    {/* 결과페이지 헤더 */}
                    <div className="result-header">
                        <div className="header-main">
                            <div className="header-text">
                                <h1>당신만을 위한 건강 분석</h1>
                                <p>개인 특성과 맞춤 영양소 기반 리포트를 제공합니다.</p>
                            </div>
                            <div className="header-image">
                                <img src="/img/결과헤더.png" alt="개인 목표 이미지" />
                            </div>
                        </div>
                        <div className="wave-divider">
                            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
                                <path
                                    fill="#ffffff"
                                    d="
    M0,160
    C240,-120 480,440 720,160
    C960,-120 1200,440 1440,160
    L1440,320
    L0,320
    Z"
                                />
                            </svg>
                        </div>
                    </div>
                    {/* 결과 페이지 컨텐츠 */}
                    <div className="contents-main">
                        {/* 카드 */}
                        <div className="title1">
                            <h1>영양소 정보</h1>
                        </div>
                        <div className="card-container">
                            <div className="left">
                                {/* 카드 */}
                                <div
                                    className="card-bar"
                                    data-name="탄수화물"
                                    data-value="55%"
                                    data-desc="탄수화물은 에너지 공급에 중요합니다."
                                >
                                    <div className="bar-label">탄수화물</div>
                                    <div className="bar-container">
                                        <div className="bar-inner blue">
                                            <div className="indicator" />
                                        </div>
                                    </div>
                                    <div className="card-bar-label">
                                        <li>부족</li>
                                        <li>과다</li>
                                    </div>
                                </div>
                                <div
                                    className="card-bar"
                                    data-name="단백질"
                                    data-value="52%"
                                    data-desc="단백질은 근육 형성과 면역 유지에 중요합니다."
                                >
                                    <div className="bar-label">단백질</div>
                                    <div className="bar-container">
                                        <div className="bar-inner yellow">
                                            <div className="indicator" />
                                        </div>
                                    </div>
                                    <div className="card-bar-label">
                                        <li>부족</li>
                                        <li>과다</li>
                                    </div>
                                </div>
                                <div
                                    className="card-bar"
                                    data-name="지방"
                                    data-value="78%"
                                    data-desc="지방은 에너지원으로 활용되며 지용성 비타민의 흡수를 돕고, 체온 유지 및 장기 보호 역할을 합니다. 하지만 과잉 섭취 시 비만, 고지혈증, 심혈관 질환의 위험이 있습니다. 포화지방보다 불포화지방을 중심으로 섭취하는 것이 좋습니다."
                                >
                                    <div className="bar-label">지방</div>
                                    <div className="bar-container">
                                        <div className="bar-inner green">
                                            <div className="indicator" />
                                        </div>
                                    </div>
                                    <div className="card-bar-label">
                                        <li>부족</li>
                                        <li>과다</li>
                                    </div>
                                </div>
                                <div
                                    className="card-bar"
                                    data-name="비타민"
                                    data-value="43%"
                                    data-desc="비타민은 몸의 대사 기능과 면역 체계를 유지하는 데 필수적인 영양소입니다. 부족할 경우 피로, 면역 저하, 피부 트러블 등이 발생할 수 있으며, 특히 수용성 비타민은 체내에 저장되지 않기 때문에 꾸준한 섭취가 중요합니다."
                                >
                                    <div className="bar-label">비타민</div>
                                    <div className="bar-container">
                                        <div className="bar-inner purple">
                                            <div className="indicator" />
                                        </div>
                                    </div>
                                    <div className="card-bar-label">
                                        <li>부족</li>
                                        <li>과다</li>
                                    </div>
                                </div>
                                <div
                                    className="card-bar"
                                    data-name="아이오딘"
                                    data-value="90%"
                                    data-desc="아이오딘은 갑상선 호르몬의 구성 성분으로 성장과 신진대사 조절에 중요합니다. 결핍 시 갑상선 기능 저하, 과잉 시 갑상선 기능 항진 등이 나타날 수 있으므로 적정량 섭취가 중요합니다. 대표 식품으로는 해조류가 있습니다."
                                >
                                    <div className="bar-label">아이오딘</div>
                                    <div className="bar-container">
                                        <div className="bar-inner red">
                                            <div className="indicator" />
                                        </div>
                                    </div>
                                    <div className="card-bar-label">
                                        <li>부족</li>
                                        <li>과다</li>
                                    </div>
                                </div>
                                <div
                                    className="card-bar"
                                    data-name="철분"
                                    data-value="47%"
                                    data-desc="철분은 혈액 내 헤모글로빈을 생성하여 산소를 신체에 운반하는 데 필수적인 미네랄입니다. 부족하면 빈혈, 피로, 집중력 저하가 나타날 수 있으며, 여성과 성장기 청소년에게 특히 중요합니다. 대표적인 식품으로는 간, 시금치, 적색육, 콩류 등이 있습니다."
                                >
                                    <div className="bar-label">철분</div>
                                    <div className="bar-container">
                                        <div className="bar-inner teal">
                                            <div className="indicator" />
                                        </div>
                                    </div>
                                    <div className="card-bar-label">
                                        <li>부족</li>
                                        <li>과다</li>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="info-container">
                                    <h2 id="nutrient-name">영양소</h2>
                                    <p>
                                        <span id="nutrient-value">%</span>
                                    </p>
                                    <p id="nutrient-desc">설명창입니다.</p>
                                </div>
                            </div>
                        </div>
                        <div className="title">
                            <h1>영향을 미치는 특성</h1>
                        </div>
                        <div className="card-nutrient-result">
                            <div className="icon-group" id="icon-group">
                                <div
                                    className="nutirent-icon-container"
                                    data-desc="이것은 예시1에 대한 설명입니다."
                                    data-color="#3d9dbf"
                                >
                                    <div className="icon-box blue">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2025/04/23/01/35/bird-9551361_1280.jpg"
                                            alt="#"
                                        />
                                    </div>
                                    <p>예시1</p>
                                </div>
                                <div
                                    className="nutirent-icon-container"
                                    data-desc="이것은 예시2에 대한 설명입니다."
                                    data-color="#e4b322"
                                >
                                    <div className="icon-box yellow">
                                        <img src="" alt="#" />
                                    </div>
                                    <p>예시2</p>
                                </div>
                                <div
                                    className="nutirent-icon-container"
                                    data-desc="이것은 예시3에 대한 설명입니다."
                                    data-color="#2aaf74"
                                >
                                    <div className="icon-box green">
                                        <img src="" alt="#" />
                                    </div>
                                    <p>예시3</p>
                                </div>
                                <div
                                    className="nutirent-icon-container"
                                    data-desc="이것은 예시4에 대한 설명입니다."
                                    data-color="#a672c2"
                                >
                                    <div className="icon-box purple">
                                        <img src="" alt="#" />
                                    </div>
                                    <p>예시4</p>
                                </div>
                            </div>
                            <div className="dd">
                                <p id="icon-desc">무슨 내용을 넣지</p>
                            </div>
                        </div>
                        {/* 강점 */}
                        <div className="title">
                            <h1>강점</h1>
                        </div>
                        <div className="traits-container">
                            <div className="traits-row">
                                <div className="trait">
                                    <div className="icon good">
                                        <img src="/img/check_circle.svg" alt="check_circle" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                                <div className="trait">
                                    <div className="icon good">
                                        <img src="/img/check_circle.svg" alt="check_circle" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="traits-row">
                                <div className="trait">
                                    <div className="icon good">
                                        <img src="/img/check_circle.svg" alt="check_circle" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                                <div className="trait">
                                    <div className="icon good">
                                        <img src="/img/check_circle.svg" alt="check_circle" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="title">
                            <h1>약점</h1>
                        </div>
                        <div className="traits-container">
                            <div className="traits-row">
                                <div className="trait">
                                    <div className="icon bad">
                                        <img src="/img/error.svg" alt="!" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                                <div className="trait">
                                    <div className="icon bad">
                                        <img src="/img/error.svg" alt="!" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="traits-row">
                                <div className="trait">
                                    <div className="icon bad">
                                        <img src="/img/error.svg" alt="!" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                                <div className="trait">
                                    <div className="icon bad">
                                        <img src="/img/error.svg" alt="!" />
                                    </div>
                                    <div className="trait-content">
                                        <p>지적 자극을 제공하는 성격</p>
                                        <p>깊이 있는 대화를 통해 의미 있는 관계를 구축합니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="next-button">
                            추천 페이지
                            <span className="material-symbols-outlined">arrow_forward_ios</span>
                        </button>
                    </div>
                </>


            }
        </>
    );
};

export default ResultPage;