// script.js

document.addEventListener('DOMContentLoaded', function () {
  const bars = document.querySelectorAll('.card-bar');

  bars.forEach((bar) => {
    const indicator = bar.querySelector('.indicator');
    const value = bar.getAttribute('data-value') || '0%';

    // 숫자만 추출해서 퍼센트 값으로 사용
    const percent = parseFloat(value);
    indicator.style.left = `${percent}%`;
  });
});
