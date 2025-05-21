import React from "react";

export default function ProductInquiryPage() {
  return (
    <>
      <div className="user-box">
        <div className="user-top">
          <div>🌱 강강강</div>
          <form action="javascript:void(0)" method="post">
            <button type="submit" className="logout-button">
              로그아웃
            </button>
          </form>
        </div>
        <div className="delivery-status-summary">
          📦 현재 배송 상태: <span className="badge">2 / 3건 배송 완료</span>
        </div>
        <div className="delivery-detail-button">
          <button onClick={() => {}}>배송 상세보기</button>
        </div>
      </div>

      <div className="form-box">
        <h3>상품문의</h3>
        <div className="inquiry-list">
          <table className="inquiry-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>문의유형</th>
                <th>내용</th>
                <th>문의일</th>
                <th>답변상태</th>
              </tr>
            </thead>
            <tbody>
              {/* 문의 1 */}
              <tr>
                <td>1</td>
                <td>상품</td>
                <td className="inquiry-content">
                  <a href="/pages/Details/Details.html">
                    <img
                      src="/img/2월 제철음식.png"
                      alt="상품 이미지"
                      className="product-thumb"
                    />
                  </a>
                  <a href="#">
                    <div className="text-wrap">
                      <div className="title">언제 잡은 건가요?</div>
                      <div className="subtitle">
                        한돈 부위별 대용량 가성비 7종
                      </div>
                    </div>
                  </a>
                </td>
                <td>2022-03-23</td>
                <td>
                  <button className="status-btn waiting">답변대기</button>
                </td>
              </tr>

              {/* 문의 2 */}
              <tr>
                <td>2</td>
                <td>상품</td>
                <td className="inquiry-content">
                  <a href="/pages/Details/Details.html">
                    <img
                      src="/img/1월 제철음식.png"
                      alt="상품 이미지"
                      className="product-thumb"
                    />
                  </a>
                  <a href="#">
                    <div className="text-wrap with-icon">
                      <span className="lock-icon">🔒</span>
                      <div className="text">
                        <div className="title">문의드립니다</div>
                        <div className="subtitle">
                          동물복지 백색 유정란 20구
                        </div>
                      </div>
                    </div>
                  </a>
                </td>
                <td>2022-01-20</td>
                <td>
                  <button className="status-btn complete">답변완료</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
