$(document).ready(function () {
    let count = 1;
    const unitPrice = 18900;
  
    // 수량 증가 버튼 클릭
    $('.plus').on('click', function () {
      count++;
      updateDisplay();
    });
  
    // 수량 감소 버튼 클릭
    $('.minus').on('click', function () {
      if (count > 1) {
        count--;
        updateDisplay();
      }
    });
  
    // 화면에 수량과 총합 표시
    function updateDisplay() {
      $('.qty-number').text(count);
      $('.summary-box strong:first').text(`${count}개`);
      $('.total-price strong').text(`${(unitPrice * count).toLocaleString()}원`);
    }
  
    // 페이지 로드시 초기 상태 표시
    updateDisplay();
  });
  
  $(document).ready(function () {
    $('.tab-btn').click(function () {
      // 버튼 활성화 시각 처리
      $('.tab-btn').removeClass('active');
      $(this).addClass('active');
  
      // 모든 탭 콘텐츠 숨기기
      $('.tab-content').hide();
  
      // 선택된 탭만 보여주기
      const target = $(this).data('target');
      $('#' + target).show();
    });
  });
  