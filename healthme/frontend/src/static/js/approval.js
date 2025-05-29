document.addEventListener("DOMContentLoaded", function () {
  const leftBtn = document.querySelector(".left-button");
  const rightBtn = document.querySelector(".right-button");

  leftBtn.addEventListener("click", () => {
    leftBtn.classList.add("active");
    rightBtn.classList.remove("active");
  });

  rightBtn.addEventListener("click", () => {
    rightBtn.classList.add("active");
    leftBtn.classList.remove("active");
  });

  const buttons = document.querySelectorAll(".button-set button");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
