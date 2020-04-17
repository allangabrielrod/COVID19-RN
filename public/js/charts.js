var ctx = document.getElementById('testChart');
var chartData = {
    labels: [],
    datasets: [{
        label: 'Mortes',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    },
    {
        label: 'Confirmados',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]
}

dados.sort( function (x , y) {
    return y.confirmed - x.confirmed;
});

dados.forEach(element => {
    if (element.place_type === "city" && element.confirmed) {
        chartData.labels.push(element.city);
        chartData.datasets[0].data.push(element.deaths);
        chartData.datasets[1].data.push(element.confirmed);
    }
});

var testChart = new Chart(ctx, {
    type: 'bar',
    data: chartData
});