$(document).ready(function () {
  const unitPrice = 18900;

  // updateDisplay 함수 정의
  function updateDisplay() {
    let count = parseInt($('.qty-input').val());
    if (isNaN(count) || count < 1) count = 1;
    $('.qty-input').val(count);

    $('.summary-box strong:first').text(`${count}개`);
    $('.total-price strong').text(`${(unitPrice * count).toLocaleString()}원`);
  }

  // input 변경 시 수량 반영
  $('.qty-input').on('input', function () {
    updateDisplay();
  });

  //  페이지 처음 로드 시 수량 반영
  updateDisplay();

  // 더보기 버튼 기능
  $('#showMoreBtn').on('click', function () {
    $('#descBox').addClass('expanded');
    $(this).hide();
  });

  // 탭 버튼 클릭
  $('.tab-btn').click(function () {
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').hide();
    const target = $(this).data('target');
    $('#' + target).show();
  });
});
