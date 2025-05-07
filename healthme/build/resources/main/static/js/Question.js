const questions = [
    {
      text: "햇빛을 거의 쬐지 않고 실내 생활 위주로 생활하시나요?",
      nutrient: "비타민 D",
      options: [
        { text: "항상 그렇다", value: 100 },
        { text: "가끔 그렇다", value: 66 },
        { text: "전혀 아니다", value: 33 }
      ]
    },
    {
      text: "자주 피로하거나 어지럽고 집중력이 떨어지시나요?",
      nutrient: "철분",
      options: [
        { text: "자주 그렇다", value: 100 },
        { text: "가끔 그렇다", value: 66 },
        { text: "거의 없다", value: 33 }
      ]
    },
    {
      text: "단백질 식품 섭취가 부족한가요?",
      nutrient: "단백질",
      options: [
        { text: "매우 부족하다", value: 100 },
        { text: "약간 부족하다", value: 66 },
        { text: "충분히 섭취하고 있다", value: 33 }
      ]
    },
    {
      text: "유제품을 거의 드시지 않나요?",
      nutrient: "칼슘",
      options: [
        { text: "거의 먹지 않는다", value: 100 },
        { text: "가끔 먹는다", value: 66 },
        { text: "자주 먹는다", value: 33 }
      ]
    },
    {
      text: "채소, 과일, 해조류를 하루 1번 이하로 섭취하시나요?",
      nutrient: "식이섬유",
      options: [
        { text: "그렇다", value: 100 },
        { text: "가끔 그렇다", value: 66 },
        { text: "아니다", value: 33 }
      ]
    },
    {
      text: "스트레스를 자주 느끼고, 눈 떨림이나 근육 경련이 있나요?",
      nutrient: "마그네슘",
      options: [
        { text: "자주 느낀다", value: 100 },
        { text: "가끔 느낀다", value: 66 },
        { text: "거의 없다", value: 33 }
      ]
    },
    {
      text: "고염식이나 인스턴트를 자주 드시나요?",
      nutrient: "칼륨",
      options: [
        { text: "자주 먹는다", value: 100 },
        { text: "가끔 먹는다", value: 66 },
        { text: "거의 먹지 않는다", value: 33 }
      ]
    },
    {
      text: "머리카락 빠짐이나 손톱 약화가 있나요?",
      nutrient: "비오틴",
      options: [
        { text: "심하게 느낀다", value: 100 },
        { text: "약간 느낀다", value: 66 },
        { text: "전혀 느끼지 않는다", value: 33 }
      ]
    },
    {
      text: "상처가 잘 낫지 않거나, 면역력이 떨어졌나요?",
      nutrient: "아연",
      options: [
        { text: "그렇다", value: 100 },
        { text: "가끔 그렇다", value: 66 },
        { text: "아니다", value: 33 }
      ]
    },
    {
      text: "운동 후 펌핑감 부족 또는 체력 저하가 느껴지나요?",
      nutrient: "아르기닌",
      options: [
        { text: "자주 그렇다", value: 100 },
        { text: "가끔 그렇다", value: 66 },
        { text: "거의 없다", value: 33 }
      ]
    }
  ];
  
  let current = 0;
  let answers = [];
  let results = {};
  
  function loadQuestion() {
    const q = questions[current];
    document.getElementById("question-title").innerText = `Q${current + 1}.`;
    document.getElementById("question-text").innerText = q.text;
  
    // 진행률 업데이트
    const percent = (current / questions.length) * 100;
    document.getElementById("bar-fill").style.width = `${percent}%`;
    document.getElementById("progress-text").innerText = `${current + 1} / ${questions.length}`;
  
    // 선택지
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.innerText = opt.text;
      btn.onclick = () => {
        answers[current] = opt.value;
        results[q.nutrient] = opt.value;
        current++;
        if (current < questions.length) {
          loadQuestion();
        } else {
          showResults();
        }
      };
      optionsContainer.appendChild(btn);
    });
  }
  
  function goBack() {
    if (current > 0) {
      current--;
      loadQuestion();
    }
  }
  
  function showResults() {
    localStorage.setItem("nutrientResults", JSON.stringify(results));
    window.location.href = "/pages/Result/Result.html";
  }
  
  
  function restartQuiz() {
    current = 0;
    results = {};
    answers = [];
    document.getElementById("result-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
  }
  
  window.onload = loadQuestion;
  