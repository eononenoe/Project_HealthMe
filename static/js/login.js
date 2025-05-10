$(function () {
    $("#loginBtn").on("click", function (e) {
      e.preventDefault();
      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "/index.html";
    });
  });
  