var dates = document.querySelectorAll(".date");

init();

function init(){
    formatDates(dates);
}

function formatDates (dates) {
    moment.locale("pt-br");
    dates.forEach(function (item) {
        item.textContent = moment(dates.textContent).format("L");
    });
}