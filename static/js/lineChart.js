Chart.defaults.font.family = 'PlayFair';

async function getData(){
    const response = await fetch('static/js/ocean-basin-data.csv'); // Change to ocean-basin-data.csv
    const data = await response.text(); // CSV is in TEXT format instead of image

    console.log(data);

    const xEpochs = [];
    const yLoss = [];

    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(',');
        const epoch = parseInt(columns[0]);
        const loss = parseFloat(columns[1]);
        xEpochs.push(epoch);
        yLoss.push(loss);
    })

    return {xEpochs, yLoss};
}

async function createChart() {
    const data = await getData(); // Retrieve data

    const ctx = document.getElementById('myChart');
    const degSym = String.fromCharCode(176);
    console.log(degSym);

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xEpochs,
            datasets: [
                {
                    label: 'Loss',
                    data: data.yLoss,
                    fill: false,
                    pointStyle: 'circle', // Set the point style to circles
                    pointRadius: 4,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    bordWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Epochs',
                        font: {
                            size: 20,
                        }
                    },
                    ticks: {
                        font: {
                            size: 16,
                            color: 'black'
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Loss',
                        font: {
                            size: 20,
                            color: 'black'
                        },
                    },
                    ticks: {
                        font: {
                            size: 12,
                            color: 'black'
                        },
                        suggestedMin: 5.10E-05, // Set the minimum y-axis value
                        callback: function (value, index, values) {
                            return value.toExponential(2); // Format y-axis values in exponential notation
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Loss vs. Epochs',
                    font: {
                        size: 24,
                        color: 'black'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();

getData(); // Invoke the function to generate and log the CSV content

