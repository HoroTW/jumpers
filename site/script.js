$.getJSON("../jumpers.json", ).done(function(results) {
    const labels = Object.values(results.timestamp);
    const checkedInC = Object.values(results.countCheckedInCustomer);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Checked in customers',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: checkedInC,
        }]
    };

    createChart(labels, data);
}).fail(function() {
    console.log("An error has occurred.");
});



function createChart(labels, data) {
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    };
    const myChart = new Chart(
        ctx,
        config
    );
}