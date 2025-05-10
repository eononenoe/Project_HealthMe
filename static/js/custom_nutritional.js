document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.gauge-fill').forEach((fill) => {
      const widthStr = fill.style.width;
      const percent = parseInt(widthStr);
  
      if (percent <= 33) {
        fill.style.backgroundColor = '#e74c3c'; // 빨강
      } else if (percent <= 66) {
        fill.style.backgroundColor = '#f39c12'; // 주황
      } else {
        fill.style.backgroundColor = '#4caf50'; // 초록
      }
    });
  });
  