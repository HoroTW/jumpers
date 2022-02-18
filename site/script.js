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
            tension: 0.2
        }]
    };

    createChart(labels, data);
}).fail(function() {
    console.log("An error has occurred.");
});


luxon.Settings.defaultLocale = "de-de";
luxon.Settings.defaultZone = "Europe/Berlin";
luxon.Zone = new luxon.IANAZone("Europe/Berlin");


function createChart(labels, data) {
    var canvas = document.getElementById("myChart");
    var ctx = canvas.getContext("2d");

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    grace: "2%",
                    display: true,
                    offset: true,
                    ticks: {
                        minRotation: 30,
                        maxRotation: 50,
                    },
                    type: 'time',
                    time: {
                        isoWeekday: true,
                        displayFormats: {
                            quarter: 'MMM YYYY',
                            day: 'dd. MMM',
                            hour: 'dd. HH:mm',
                            minute: 'HH:mm',
                        },
                        tooltipFormat: 'dd. MMM HH:mm',
                        minUnit: 'minute',
                    },
                    adapters: {
                        date: {
                            zone: "Europe/Berlin",
                        }
                    }
                },
                y: {

                    display: true,
                    offset: true,
                    min: 0,
                    max: 140,
                }
            },

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
                    },
                },
            },
        }
    };

    Chart.defaults.font.size = 24;

    const myChart = new Chart(
        ctx,
        config
    );
}