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

  $('.btn-up').on('click', function () {
    let count = parseInt($('.qty-input').val()) || 1;
    $('.qty-input').val(count + 1);
    updateDisplay();
  });

  $('.btn-down').on('click', function () {
    let count = parseInt($('.qty-input').val()) || 1;
    if (count > 1) {
      $('.qty-input').val(count - 1);
      updateDisplay();
    }
  });

  updateDisplay();

  // 더보기 버튼 기능
  $('#showMoreBtn').on('click', function () {
    $('#detail').addClass('expanded'); // 수정된 ID
    $(this).hide();
  });

  // 탭 버튼 클릭
  $('.tab-button').on('click', function () {
    const $this = $(this);
    const targetId = $this.data('tab');

    $('.tab-button').removeClass('active');
    $this.addClass('active');

    $('.tab-content').removeClass('active');
    $('#' + targetId).addClass('active');

    // 스크롤 이동
    scrollToSection(targetId);

    // 상품정보 더보기 버튼 제어
    if (targetId === 'detail' && !$('#detail').hasClass('expanded')) {
      $('#showMoreBtn').show();
    } else {
      $('#showMoreBtn').hide();
    }
  });
});
