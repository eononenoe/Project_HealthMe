const ctx1 = document.getElementById('myChart');

new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['4.18', '4.19', '4.20', '4.21'],
    datasets: [{
      data: [75, 68, 95, 82],
      fill: true,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30  // 상단 패딩 추가
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {         // 추가 부분
        anchor: 'end',
        align: 'end',
        color: '#000',       // 수치 글자 색
        font: {
          weight: '200',
          size: 12
        }
      }
    }
  },
  plugins: [ChartDataLabels] // plugins 배열에 ChartDataLabels 추가
});
