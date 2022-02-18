$.getJSON("jumpers.json", ).done(function(results) {
    const labels = Object.values(results.timestamp);
    const checkedInC = Object.values(results.countCheckedInCustomer);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Checked in customers',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: checkedInC,
            tension: 0.1
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
            maintainAspectRatio: false,
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x'
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'x',
                    }
                }
            }
        }
    };

    Chart.defaults.font.size = 24;

    const myChart = new Chart(
        ctx,
        config
    );
}