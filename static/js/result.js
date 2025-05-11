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
});