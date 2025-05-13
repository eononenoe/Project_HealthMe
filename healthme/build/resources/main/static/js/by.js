// 1. 메뉴바 선택 시 해당 콘텐츠 표시
document.addEventListener("DOMContentLoaded", function () {
  function showContent(menuNumber) {
    document.querySelectorAll(".content").forEach(function (content) {
      content.style.display = "none";
    });
    document.getElementById("content" + menuNumber).style.display = "block";

    document.querySelectorAll(".ani-navbar-menu").forEach(function (menu) {
      menu.classList.remove("active");
    });
    document.getElementById("menu" + menuNumber).classList.add("active");
  }

  document.querySelectorAll(".content").forEach(function (content) {
    content.style.display = "none"; // 초기 숨기기
  });

  ["menu1", "menu2", "menu3", "menu4"].forEach((id, index) => {
    const menu = document.getElementById(id);
    if (menu) {
      menu.addEventListener("click", () => showContent(index + 1));
    }
  });
});

// 2. jQuery 로드 함수
function loadJQuery(callback) {
  if (window.jQuery) {
    callback();
  } else {
    var script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    script.onload = callback;
    document.head.appendChild(script);
  }
}

// 3. jQuery 코드 실행
loadJQuery(function () {
  $(function () {
    // 옆 슬라이더 바 내려오는 제이쿼리
    var $floating = $(".floating");
    var stopPosition = 150;
    var startOffset = 300;

    $(window).on("scroll", function () {
      var scrollTop = $(window).scrollTop();
      var newTop = scrollTop + startOffset;
      if (scrollTop < stopPosition) {
        $floating.stop().animate({ top: newTop + "px" });
      } else {
        $floating.stop().animate({ top: stopPosition + "px" });
      }
    });

    // 헤더, 푸터 불러오기
   $("#header").load("/common/header.html", function () {
     adjustMainHeight();
   });
   $("#footer").load("/common/footer.html", function () {
     adjustMainHeight();
   });
  });
});

// 4. 메인 높이 조정 함수
function adjustMainHeight() {
  const main = document.querySelector('main');
  const footer = document.getElementById('footer');

  if (main && footer) {
    const windowHeight = window.innerHeight;
    const headerHeight = 160; // 헤더 높이
    const footerHeight = 100; // 푸터 높이

    const expectedHeight = windowHeight - headerHeight - footerHeight;

    if (main.offsetHeight < expectedHeight) {
      main.style.minHeight = expectedHeight + "px";
    }
  }
}

// 5. 하트 숫자
document.addEventListener("DOMContentLoaded", function () {
  const check_btn = document.querySelectorAll(".check_icon");
  const count_btn = document.querySelectorAll(".counter");

  check_btn.forEach((item, index) => {
    let count = 0;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      count_btn[index].textContent = ++count;
    });
  });
});

// 6. 맨 위로 올라가기
document.addEventListener("DOMContentLoaded", function () {
  const go_top = document.querySelector(".page_up");
  if (go_top) {
    go_top.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
