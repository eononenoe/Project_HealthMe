function start(type) {
  const beginner = document.getElementById('beginner');
  const advanced = document.getElementById('advanced');
  const survey = document.getElementById('survey');

  if (type === 'beginner') {
    // 숙련자 밀기 + 사라지기
    advanced.style.transform = 'translateX(100vw)';
    advanced.style.opacity = '0';

    // 초보자 중앙 이동
    beginner.style.position = 'absolute';
    beginner.style.left = '50%';
    beginner.style.top = '50%';
    beginner.style.transform = 'translate(-50%, -50%) scale(1.1)';
    beginner.style.zIndex = '10';
  } else {
    // 초보자 밀기 + 사라지기
    beginner.style.transform = 'translateX(-100vw)';
    beginner.style.opacity = '0';

    // 숙련자 중앙 이동
    advanced.style.position = 'absolute';
    advanced.style.left = '50%';
    advanced.style.top = '50%';
    advanced.style.transform = 'translate(-50%, -50%) scale(1.1)';
    advanced.style.zIndex = '10';
  }

  // 애니메이션 끝나고 설문 보여주기
  setTimeout(() => {
    document.querySelector('.container').style.display = 'none';
    survey.style.display = 'block';
  }, 800);
}
