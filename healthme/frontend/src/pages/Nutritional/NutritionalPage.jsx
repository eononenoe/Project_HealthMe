import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'static/css/pages/Nutritional.css';
import { useNavigate } from "react-router-dom";

// 성인 남성 기준 영양소 권장 수치량 (실제 단위: g, mg, µg)
// 이 값들은 displayValue를 계산할 때 '기준'이 됩니다.
const maxScoreMap = {
  "단백질": 154,    // g
  "마그네슘": 400,  // mg
  "칼슘": 1200,     // mg
  "비타민 D": 45,   // µg 
  "아연": 15,       // mg
  "철분": 18,       // mg 
  "식이섬유": 30,   // g
  "칼륨": 4700,     // mg
  "아르기닌": 7000, // mg
  "비오틴": 30      // µg
};

// 제품의 영양소 정보를 표시용으로 포맷하는 함수 (mg -> g 변환 포함)
// 이는 제품 상세 정보 '영양정보 더보기'에 사용됩니다.
const formatNutrient = (label, value, unit) => {
  if (value === null || value === undefined || value === '') return null;
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return null;

  let displayValue = numericValue;
  let displayUnit = unit;

  // mg 값이 1000 이상이면 g으로 변환
  if (unit === 'mg' && numericValue >= 1000) {
    displayValue = (numericValue / 1000).toFixed(1);
    displayUnit = 'g';
  }

  return { label, value: displayValue, unit: displayUnit };
};

// 영양소 막대 바를 표시하는 컴포넌트
const CardBar = ({ name, percent, displayValue, unit, onClick }) => {
  // 퍼센트에 따라 색상 클래스 결정
  const getColorClass = (percent) => {
    if (percent <= 20) return 'red';
    if (percent <= 40) return 'orange';
    if (percent <= 60) return 'yellow';
    if (percent <= 80) return 'green';
    return 'blue';
  };

  const colorClass = getColorClass(percent);
  return (
    <div className="nutritional_card-bar" onClick={onClick}>
      <div className="nutritional_bar-label">
        {name} <span className="nutritional_bar-percent">{displayValue}{unit}</span> {/* 누적된 실제 섭취량 표시 */}
      </div>
      <div className="nutritional_bar-container">
        <div
          className={`nutritional_bar-inner ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
        <div
          className={`nutritional_indicator ${colorClass}`}
          style={{ left: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default function CustomNutritionalPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [resultMap, setResultMap] = useState({});
  const [selectedNutrient, setSelectedNutrient] = useState(null);

  // userNutrientScores: 설문 결과를 나타내는 '점수'를 누적 (백엔드에서 받은 초기값 + 제품 추가 시 점수 환산)
  const [userNutrientScores, setUserNutrientScores] = useState({});

  // accumulatedNutrients: 장바구니에 담긴 제품들의 '실제 영양소 총합' (g, mg, µg 단위)
  // CardBar의 displayValue에 직접 사용될 실제량
  const [accumulatedNutrients, setAccumulatedNutrients] = useState({
    "단백질": 154,
    "마그네슘": 400,
    "비오틴": 30,
    "비타민 D": 45,
    "식이섬유": 30,
    "아르기닌": 7000,
    "아연": 15,
    "철분": 18,
    "칼륨": 4700,
    "칼슘": 1200
  });

  // userNutrientMaxScores: 설문의 '최대 가능 점수' (예: 단백질 18점, 칼슘 12점 등)
  // 이 값은 백엔드에서 사용자별 맞춤형 최대 점수를 제공해야 합니다.
  // 현재는 임시로 설정한 값. 실제로는 백엔드에서 정확한 값을 받아와야 합니다.
  const [userNutrientMaxScores, setUserNutrientMaxScores] = useState({
    "단백질": 18,
    "마그네슘": 12,
    "비오틴": 12,
    "비타민 D": 18,
    "식이섬유": 12,
    "아르기닌": 12,
    "아연": 12,
    "철분": 18,
    "칼륨": 12,
    "칼슘": 12
  });

  const navigate = useNavigate();

  // 제품의 실제 영양소량(g, mg, µg)을 설문 점수로 변환하는 헬퍼 함수
  // 이 함수는 'maxScoreMap' (실제 권장량)과 'userNutrientMaxScores' (최대 점수)를 사용하여
  // 제품의 영양소량이 최대 점수 대비 몇 점에 해당하는지 비례적으로 계산합니다.
  const convertNutrientValueToScore = (nutrientName, value) => {
    const recommendedAmount = maxScoreMap[nutrientName]; // 이 영양소의 실제 권장량 (g, mg 등)
    const maxScore = userNutrientMaxScores[nutrientName]; // 이 영양소의 최대 점수 (18점 등)

    // 유효성 검사: 기준값이 없거나 0 이하면 점수 계산 불가
    if (!recommendedAmount || !maxScore || recommendedAmount <= 0 || maxScore <= 0) {
      console.warn(`[convertNutrientValueToScore] ${nutrientName}: 유효한 권장량(${recommendedAmount}) 또는 최대 점수(${maxScore})가 없어 점수 환산 불가.`);
      return 0;
    }

    // 환산 로직: (제품의 실제량 / 영양소의 실제 권장량) * 해당 영양소의 최대 점수
    // 예: (단백질 24g / 단백질 154g 권장량) * 단백질 18점 = X점
    const score = (value / recommendedAmount) * maxScore;
    return score;
  };

  // 영양소 정보(percent, displayValue, unit)를 계산하여 resultMap에 저장하는 함수
  const summarize = () => {
    const updatedResultMap = {};

    // maxScoreMap의 모든 키를 순회하여 영양소 처리
    for (const nutrientName of Object.keys(maxScoreMap)) {
      // 1. 퍼센트 계산 (그래프 길이에 사용): 설문 점수 기반
      const userScore = userNutrientScores[nutrientName] || 0; // 현재 사용자의 설문 점수
      const maxPossibleScore = userNutrientMaxScores[nutrientName]; // 해당 영양소의 설문 최대 점수

      let percent = 0;
      if (maxPossibleScore > 0) {
        percent = Math.min(100, Math.round((userScore / maxPossibleScore) * 100));
      }

      // 2. 표시될 실제 섭취량 계산 (텍스트에 사용): accumulatedNutrients 기반
      let currentAccumulatedValue = accumulatedNutrients[nutrientName] || 0;
      let unit = '';
      let finalDisplayValue;

      if (['단백질', '식이섬유'].includes(nutrientName)) {
        unit = 'g';
        finalDisplayValue = currentAccumulatedValue.toFixed(1); // g 단위는 소수점 1자리로 표현
      } else if (['칼슘', '철분', '마그네슘', '칼륨', '아연', '아르기닌'].includes(nutrientName)) {
        unit = 'mg';
        // mg 값이 1000 이상이면 g으로 변환
        if (currentAccumulatedValue >= 1000) {
          finalDisplayValue = (currentAccumulatedValue / 1000).toFixed(1);
          unit = 'g';
        } else {
          finalDisplayValue = Math.round(currentAccumulatedValue); // 1000mg 미만은 정수로 표현
        }
      } else if (['비타민 D', '비오틴'].includes(nutrientName)) {
        unit = 'µg';
        finalDisplayValue = Math.round(currentAccumulatedValue); // µg 단위는 정수로 표현
      } else {
        // 정의되지 않은 영양소 처리 (안전 장치)
        unit = '';
        finalDisplayValue = currentAccumulatedValue.toFixed(1);
      }

      // 최종적으로 숫자로 파싱하여 저장
      updatedResultMap[nutrientName] = { percent, displayValue: parseFloat(finalDisplayValue), unit };
    }
    setResultMap(updatedResultMap);
  };

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");

    if (!loginUser) {
      alert("이 페이지는 로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    const userid = JSON.parse(loginUser).userid;

    // 1. 제품 데이터 로드
    axios.get('http://localhost:8090/healthme/products/details', { withCredentials: true })
      .then((res) => {
        if (!Array.isArray(res.data)) {
          console.error("응답 형식 오류: 배열이 아님");
          return;
        }

        const mappedProducts = res.data.map((item, idx) => {
          const productId = item.productId ?? `temp-${idx}`;
          const nutrientsRaw = [
            // '영양정보 더보기' 섹션에 표시될 포맷된 영양소 정보 (단위 변환 포함)
            formatNutrient('단백질', item.protein, 'g'),
            formatNutrient('철분', item.iron, 'mg'),
            formatNutrient('칼슘', item.calcium, 'mg'),
            formatNutrient('비타민 D', item.vitamin_d, 'µg'),
            formatNutrient('식이섬유', item.dietary_fiber, 'g'),
            formatNutrient('마그네슘', item.magnesium, 'mg'),
            formatNutrient('칼륨', item.potassium, 'mg'),
            formatNutrient('비오틴', item.biotin, 'µg'),
            formatNutrient('아르기닌', item.arginine, 'mg'),
            formatNutrient('아연', item.zinc, 'mg'),
          ].filter(Boolean);

          // 계산에 사용될 실제 영양소 값 (단위 변환 없음)
          // 이 값들은 product.nutrientValues에 저장되어 addToCart 시 사용됩니다.
          const trueNutrientValues = {
            "단백질": parseFloat(item.protein) || 0,
            "철분": parseFloat(item.iron) || 0,
            "칼슘": parseFloat(item.calcium) || 0,
            "비타민 D": parseFloat(item.vitamin_d) || 0,
            "식이섬유": parseFloat(item.dietary_fiber) || 0,
            "마그네슘": parseFloat(item.magnesium) || 0,
            "칼륨": parseFloat(item.potassium) || 0,
            "비오틴": parseFloat(item.biotin) || 0,
            "아르기닌": parseFloat(item.arginine) || 0,
            "아연": parseFloat(item.zinc) || 0
          };

          return {
            id: String(productId),
            name: item.name,
            price: item.salprice,
            originalPrice: item.price,
            discount: Math.round((1 - item.salprice / item.price) * 100),
            img: item.image_url,
            nutrientsLeft: nutrientsRaw.slice(0, 5),
            nutrientsRight: nutrientsRaw.slice(5),
            sales_count: item.sales_count,
            nutrientValues: trueNutrientValues, // 실제 영양소 값
          };
        });
        setProducts(mappedProducts);
      })
      .catch((error) => {
        console.error("제품 API 요청 실패:", error);
      });

    // 2. 사용자 설문 점수 로드 (userNutrientScores 초기화)
    // 이 API는 사용자의 초기 영양소 '점수'를 반환해야 합니다.
    axios.get("http://localhost:8090/healthme/survey/scores", {
      params: { userid },
      withCredentials: true
    })
      .then(res => {
        setUserNutrientScores(res.data);

        // 초기 accumulatedNutrients를 설문 점수를 기반으로 환산하여 설정 (옵션)
        // 만약 초기 accumulatedNutrients를 설문 점수와 무관하게 0부터 시작하고 싶다면 이 블록을 제거
        const initialAccumulated = {};
        for (const nutrientName of Object.keys(res.data)) {
          const score = res.data[nutrientName];
          const maxScore = userNutrientMaxScores[nutrientName];
          const recommended = maxScoreMap[nutrientName];

          if (maxScore && recommended && maxScore > 0) {
            initialAccumulated[nutrientName] = (score / maxScore) * recommended;
          } else {
            initialAccumulated[nutrientName] = 0;
          }
        }
        setAccumulatedNutrients(initialAccumulated);
        console.log("초기 누적 영양소 (accumulatedNutrients):", initialAccumulated);

      })
      .catch(err => {
        console.error("설문 결과 API 실패:", err);
      });

  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // userNutrientScores 또는 accumulatedNutrients가 변경될 때마다 summarize 함수 호출
  // (userNutrientMaxScores는 거의 변하지 않으므로 의존성에서 제거해도 무방)
  useEffect(() => {
    // 두 상태 모두 내용이 있을 때만 summarize 실행
    if (Object.keys(userNutrientScores).length > 0 && Object.keys(accumulatedNutrients).length > 0) {
      summarize();
    }
  }, [userNutrientScores, accumulatedNutrients]); // 의존성 배열 업데이트

  const toggleExpand = (productId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [String(productId)]: !prev[String(productId)],
    }));
  };

  // 장바구니에 제품을 추가할 때 '점수'를 userNutrientScores에 합산하는 함수
  const addScoresFromProduct = (nutrientValues) => {
    setUserNutrientScores((prevScores) => {
      const updatedScores = { ...prevScores };
      for (const [nutrient, value] of Object.entries(nutrientValues)) {
        // 제품의 실제 영양소 값(value)을 점수로 변환하여 더함
        const scoreToAdd = convertNutrientValueToScore(nutrient, value);
        updatedScores[nutrient] = (updatedScores[nutrient] || 0) + scoreToAdd;
      }
      return updatedScores;
    });
  };

  // 장바구니에 제품을 추가할 때 '실제 영양소량'을 accumulatedNutrients에 합산하는 함수
  const addNutrientsToAccumulated = (nutrientValues) => {
    setAccumulatedNutrients((prevAcc) => {
      const updatedAcc = { ...prevAcc };
      for (const [nutrient, value] of Object.entries(nutrientValues)) {
        updatedAcc[nutrient] = (updatedAcc[nutrient] || 0) + value;
      }
      return updatedAcc;
    });
  };

  // 장바구니에서 제품을 제거할 때 '점수'를 userNutrientScores에서 차감하는 함수
  const removeScoresFromProduct = (nutrientValues) => {
    setUserNutrientScores((prevScores) => {
      const updatedScores = { ...prevScores };
      for (const [nutrient, value] of Object.entries(nutrientValues)) {
        const scoreToRemove = convertNutrientValueToScore(nutrient, value);
        updatedScores[nutrient] = Math.max(0, (updatedScores[nutrient] || 0) - scoreToRemove);
        console.log(`[removeScoresFromProduct] Removing ${scoreToRemove.toFixed(2)} score for ${nutrient}. New total score: ${updatedScores[nutrient].toFixed(2)}`);
      }
      return updatedScores;
    });
  };

  // 장바구니에서 제품을 제거할 때 '실제 영양소량'을 accumulatedNutrients에서 차감하는 함수
  const removeNutrientsFromAccumulated = (nutrientValues) => {
    setAccumulatedNutrients((prevAcc) => {
      const updatedAcc = { ...prevAcc };
      for (const [nutrient, value] of Object.entries(nutrientValues)) {
        updatedAcc[nutrient] = Math.max(0, (updatedAcc[nutrient] || 0) - value); // 0 미만으로 내려가지 않도록
        console.log(`[removeNutrientsFromAccumulated] Removing ${value.toFixed(2)} ${nutrient}. New total actual amount: ${updatedAcc[nutrient].toFixed(2)}`);
      }
      return updatedAcc;
    });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        addScoresFromProduct(product.nutrientValues); // 제품 추가 시 점수 합산
        addNutrientsToAccumulated(product.nutrientValues); // 제품 추가 시 실제량 합산
        return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      } else {
        addScoresFromProduct(product.nutrientValues); // 새 제품 추가 시 점수 합산
        addNutrientsToAccumulated(product.nutrientValues); // 새 제품 추가 시 실제량 합산
        return [...prev, { ...product, qty: 1, selected: true }];
      }
    });
  };

  const toggleAll = (checked) => {
    setCart((prev) => prev.map((it) => ({ ...it, selected: checked })));
  };

  const toggleOne = (idx) => {
    setCart((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, selected: !it.selected } : it))
    );
  };

  const qty = (idx, diff) => {
    setCart((prev) =>
      prev.map((item, i) => {
        if (i === idx) {
          const newQty = Math.max(1, item.qty + diff);
          if (diff > 0) {
            addScoresFromProduct(item.nutrientValues); // 수량 증가 시 점수 합산
            addNutrientsToAccumulated(item.nutrientValues); // 수량 증가 시 실제량 합산
          } else if (diff < 0 && item.qty > 1) {
            removeScoresFromProduct(item.nutrientValues); // 수량 감소 시 점수 차감
            removeNutrientsFromAccumulated(item.nutrientValues); // 수량 감소 시 실제량 차감
          }
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  };

  const deleteSelected = () => {
    setCart((prev) => {
      const itemsToDelete = prev.filter((it) => it.selected);
      itemsToDelete.forEach(item => {
        // 제거되는 아이템의 수량만큼 영양소를 차감
        for (let i = 0; i < item.qty; i++) {
          removeScoresFromProduct(item.nutrientValues); // 점수 차감
          removeNutrientsFromAccumulated(item.nutrientValues); // 실제량 차감
        }
      });
      return prev.filter((it) => !it.selected);
    });
  };

  const selected = cart.filter((c) => c.selected);
  const totalPrice = selected.reduce((sum, v) => sum + v.price * v.qty, 0);

  const sortProducts = (order) => {
    let sorted = [];
    if (order === 'asc' || order === 'desc') {
      sorted = [...products].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
      );
    } else if (order === 'sales') {
      sorted = [...products].sort((a, b) => b.sales_count - a.sales_count);
    } else if (order === 'discount') {
      sorted = [...products].sort((a, b) => b.discount - a.discount);
    }
    setProducts(sorted);
  };

  const sortByNutrient = (nutrientName) => {
    const sorted = [...products].sort((a, b) => {
      const aValue = a.nutrientValues?.[nutrientName] ?? 0;
      const bValue = b.nutrientValues?.[nutrientName] ?? 0;
      return bValue - aValue;
    });
    setProducts(sorted);
  };

  return (
    <div className="nutritional-container">
      <aside className="nutritional-sidebar">
        <div className="nutritional-contents-main">
          <h3 className="nutrition-section-title">영양소 정보</h3>
          {Object.keys(resultMap).length > 0 ? (
            Object.keys(resultMap).map((nutrientName, idx) => {
              const result = resultMap[nutrientName];
              return (
                <CardBar
                  key={idx}
                  name={nutrientName}
                  percent={result.percent}
                  displayValue={result.displayValue}
                  unit={result.unit}
                  onClick={() => {
                    setSelectedNutrient({
                      name: nutrientName,
                      value: result.displayValue, // 이제 value는 displayValue (실제 누적량)
                    });
                    sortByNutrient(nutrientName);
                  }}
                />
              );
            })
          ) : (
            <p>영양소 정보를 불러오는 중...</p>
          )}
        </div>

        <section className="cart-section">
          <span>장바구니</span>
          <hr />
          <div className="cart-header">
            <div className="cart-header-left">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={cart.length > 0 && selected.length === cart.length}
                onChange={(e) => toggleAll(e.target.checked)}
              />
              <label>
                전체선택 ({selected.length}/{cart.length})
              </label>
            </div>
            <button onClick={deleteSelected}>선택삭제</button>
          </div>
          <hr />
          <ul className="nutritional-cart-items">
            {cart.map((item, idx) => (
              <li key={`cart-${item.id}-${idx}`}>
                <div className="nutritional-cart-line">
                  <input
                    type="checkbox"
                    className="custom-checkbox"
                    checked={item.selected}
                    onChange={() => toggleOne(idx)}
                  />
                  <div className="nutritional-cart-desc">
                    <div className="nutritional-cart-item-name">{item.name}</div>
                    <div className="nutritional-cart-item-price">
                      {item.price.toLocaleString()}원
                    </div>
                    <div className="nutritional-cart-item-quantity">
                      <button onClick={() => qty(idx, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => qty(idx, +1)}>+</button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            총 합계 : <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className="cart-footer-button">
            <button onClick={() => alert('장바구니 이동')}>장바구니 담기</button>
          </div>
        </section>
      </aside>

      <main className="nutritional_main">
        <div className="nutritional-banner">
          <img
            className="nutritional-banner-img"
            src={process.env.PUBLIC_URL + '/img/main/Banner2.jpg'}
            alt="배너"
          />
        </div>

        <ul className="nutritional_low_content">
          {[
            { label: '판매량순', type: 'sales' },
            { label: '할인율순', type: 'discount' },
            { label: '낮은 가격순', type: 'asc' },
            { label: '높은 가격순', type: 'desc' },
          ].flatMap(({ label, type }, i, arr) => {
            const items = [
              <li key={`sort-${label}`}>
                <button className="sort-btn" onClick={() => sortProducts(type)}>
                  {label}
                </button>
              </li>,
            ];
            if (i < arr.length - 1) {
              items.push(<li key={`divider-${i}`}>|</li>);
            }
            return items;
          })}
        </ul>

        <ul className="nutritional_content">
          {products.map((p, idx) => (
            <li key={`product-${p.id}-${idx}`} className="nutritional_item_store">
              <div className="nutritional_item_img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="nutritional_item_add" onClick={() => addToCart(p)}>
                <i className="fas fa-cart-shopping" /> 담기
              </div>
              <div className="nutritional_item_name">{p.name}</div>
              <div className="item_Nutritional_ingredients">
                <button
                  className="nutrition-more-button"
                  onClick={() => toggleExpand(p.id)}
                >
                  <span>{expandedItems[p.id] ? '접기' : '영양정보 더보기'}</span>
                  <span className="material-symbols-outlined">
                    {expandedItems[p.id] ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedItems[p.id] && (
                  <div className="nutrient-columns">
                    <ul className="nutrient-column">
                      {p.nutrientsLeft.map((n, i) => (
                        <li key={`left-${p.id}-${i}`}>
                          <span>{n.label}</span>
                          <span>{n.value} {n.unit}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="nutrient-column">
                      {p.nutrientsRight.map((n, i) => (
                        <li key={`right-${p.id}-${i}`}>
                          <span>{n.label}</span>
                          <span>{n.value} {n.unit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="nutritional_item_price">
                <span className="nutritional_discount">{p.discount}%</span>
                <span className="nutritional_price">{p.price.toLocaleString()}원~</span>
              </div>
              <div className="nutritional_item_review">
                <i className="fa-regular fa-comment-dots"></i>
                <span>{p.sales_count.toLocaleString()}+</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
