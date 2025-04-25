const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'radar',
    data: {
        labels: [
            // 총 12 가지
            '단백질',
            '나트륨',
            '비타민D',
            '철분',
            '칼슘',
            '식이섬유',
            '마그네슘',
            '마그네슘',
            '칼륨',
            '비오틴',
            '아연',
            '이르기닌',
        ],
        datasets: [
            {
                label: 'My INFO',
                data: [59, 90, 81, 56, 55, 40, 35, 24, 67, 78, 67, 86],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            },
            {
                label: 'Recommend INFO',
                data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }

        ]
    },
    // options: {   
    // }
});
const ctx2 = document.getElementById('myChart2');

new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['4.16', '4.17', '4.18', '4.19', '4.20', '4.21'],
    datasets: [{
      label: 'My First Dataset',
      data: [47, 68, 75, 68, 95, 82],
      fill: true,
      backgroundColor: 'rgb(75, 192, 192, 0.2)',
      borderColor: 'rgb(75, 192, 192)',
      // tension: 0.1
    }]
  }
});

