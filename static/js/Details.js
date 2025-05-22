// 스크롤
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: 'smooth'
    });
  }
}

$(document).ready(function () {
  const unitPrice = 18900;

  // 수량/금액 갱신 함수
  function updateDisplay() {
    let count = parseInt($('.qty-input').val());
    if (isNaN(count) || count < 1) count = 1;
    $('.qty-input').val(count);

    $('.summary-box strong:first').text(`${count}개`);
    $('.total-price strong').text(`${(unitPrice * count).toLocaleString()}원`);
  }

  // 수량 증가 버튼
  $('.btn-up').on('click', function () {
    let count = parseInt($('.qty-input').val()) || 1;
    $('.qty-input').val(count + 1);
    updateDisplay();
  });

  // 수량 감소 버튼
  $('.btn-down').on('click', function () {
    let count = parseInt($('.qty-input').val()) || 1;
    if (count > 1) {
      $('.qty-input').val(count - 1);
      updateDisplay();
    }
  });

  // 페이지 처음 로드 시 수량 반영
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
