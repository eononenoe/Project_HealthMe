// 결과창 헤더 스크롤효과
window.addEventListener("scroll", function () {
  const scrollY = window.scrollY;
  const image = document.querySelector(".header-image img");

  // 스크롤에 따라 이미지의 Y축 위치 조정
  image.style.transform = `translateY(${scrollY * 0.6}px)`; // 천천히 따라감
});


window.addEventListener('DOMContentLoaded', () => {
  const percentValuesFromDB = [55, 52, 78, 43, 90, 33];

  // 인디케이터 위치 설정
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, idx) => {
    const percent = percentValuesFromDB[idx] || 0;
    indicator.style.left = `${percent}%`;
  });

  // 오른쪽 설명창 바꾸기
  document.querySelectorAll('.card-bar').forEach(bar => {
    bar.addEventListener('click', () => {
      const name = bar.dataset.name;
      const value = bar.dataset.value;
      const desc = bar.dataset.desc;

      console.log("클릭됨:", name, value, desc);

      document.getElementById('nutrient-name').textContent = name;
      document.getElementById('nutrient-value').textContent = value;
      document.getElementById('nutrient-desc').textContent = desc;
    });
  });

  document.querySelectorAll('.nutirent-icon-container').forEach(container => {
    container.addEventListener('click', () => {
      const desc = container.dataset.desc;
      const color = container.dataset.color;

      console.log("클릭됨:", desc);

      document.getElementById('icon-desc').textContent = desc;

      const ddBox = document.querySelector('.dd');
      ddBox.style.borderTop = `4px solid ${color}`;
    });
  });

});
