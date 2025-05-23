const ctx1 = document.getElementById('myChart');

new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['4.18', '4.19', '4.20', '4.21'],
    datasets: [{
      data: [75, 68, 95, 82],
      fill: true,
      backgroundColor: 'rgb(34,69,123)',
      borderColor: 'rgb(75, 192, 192)',
    }]
  },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30  
      }
    },
    datasets: {
      bar: {
        borderRadius: 8,
        borderSkipped: false
      }
    },
    scales: {
      x: {
        border: {
          color: 'transparent'  // 축 선까지 완전 제거
        },
        ticks: {
          color: function(context) {
            const index = context.index;
            const total = context.chart.data.labels.length;
            return index === total - 1 ? 'white' : 'rgb(34,69,123)';
          },
          font: {
            weight: 'bold',
            size: 14
          }
        },
        grid: {
          display: false
        },
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
      datalabels: {       
        anchor: 'end',
        align: 'end',
        color: function(context) {
          const index = context.dataIndex;
          const total = context.chart.data.labels.length;
    
          // 마지막 데이터만 색상 다르게
          return index === total - 1 ? 'white' : 'rgb(34,69,123)';
        },
        font: {
          weight: 'bold',
          size: 14
        },
        anchor: 'end',
        align: 'end',
      },
    }
  },
  plugins: [ChartDataLabels] 
});

