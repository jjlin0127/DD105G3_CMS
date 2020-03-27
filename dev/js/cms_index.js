var ctx = document.getElementById("salesBarChart");
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["楊桃", "鳳梨", "火龍果", "香蕉", "草莓", "芭樂", "芒果", "蘋果", "藍莓"],
        datasets: [{
            label: '二月：銷售量',
            data: [40, 70, 50, 20, 40, 30, 120, 60, 30],
            backgroundColor: [
                'rgba(255, 206, 86, 0.2)',
                'rgba(218, 165, 32, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(243, 243, 49, 0.2)',
                'rgba(250, 0, 0, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 165, 0, 0.2)',
                'rgba(255, 99, 71, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(218, 165, 32, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(243, 243, 49, 1)',
                'rgba(250, 0, 0, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 165, 0, 1)',
                'rgba(255, 99, 71, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    }
});

function percentage(num, total) { 
    if (num == 0 || total == 0){
        return 0;
    }
    return (Math.round(num / total * 10000) / 100.00);
};

var ctx = document.getElementById("salesPieChart");
var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [percentage(40, 460), percentage(70, 460), percentage(50, 460), percentage(20, 460), percentage(40, 460), percentage(30, 460), percentage(120, 460), percentage(60, 460), percentage(30, 460)],
            backgroundColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(218, 165, 32, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(243, 243, 49, 1)',
                'rgba(250, 0, 0, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 165, 0, 1)',
                'rgba(255, 99, 71, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            label: '二月：銷售量'
        }],
        labels: ["楊桃", "鳳梨", "火龍果", "香蕉", "草莓", "芭樂", "芒果", "蘋果", "藍莓"],
    },
    options: {
        responsive: true,
        layout: {
            padding: {
                top: 20,
            },
        },
    },
});