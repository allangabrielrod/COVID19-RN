var ctx = document.getElementById("testChart");
var ctx2 = document.getElementById("testChart2");

moment.locale("pt-BR");

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

var chartData2 = {
    labels: [],
    datasets: [{
        label: 'Casos Confirmados',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    },
    {
        label: 'Mortes',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
    }]   
}

dados.sort(function (x, y) {
    return y.confirmed - x.confirmed;
});

dados2.sort(function (x, y) {
    if(x.date < y.date) {
        return -1;
    } else if (x.date > y.date) {
        return 1;
    } else {
        return 0;
    }
});

dados.forEach(function (item) {
    if (item.place_type === "city" && item.confirmed) {
        chartData.labels.push(item.city);
        chartData.datasets[0].data.push(item.deaths);
        chartData.datasets[1].data.push(item.confirmed);
    }
});

dados2.forEach(function (item, i) {
    chartData2.labels.push(moment(item.date).format("L"));
    chartData2.datasets[0].data.push(item.confirmed);
    chartData2.datasets[1].data.push(item.deaths);
});

var testChart = new Chart(ctx, {
    type: 'bar',
    data: chartData
});

var testChart2 = new Chart(ctx2, {
    type: 'line',
    data: chartData2,
});