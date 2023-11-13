Chart.defaults.font.family = 'PlayFair';

async function getData() {
    const epochs = [];
    const losses = [];

    // Generate data for 40 epochs
    for (let i = 1; i <= 40; i++) {
        epochs.push(i);
        let tempValue = 0.027 * Math.pow(10, -(i - 1));
        losses.push(tempValue);
    }

    const data = epochs.map((year, index) => {
        return `${year},${losses[index].toExponential(2)}`;
    });

    const csvContent = `Epochs,Loss\n${data.join('\n')}`;
    console.log(csvContent); // Output the CSV content

    return { epochs, losses };
}

async function createChart() {
    const data = await getData(); // Retrieve data

    const ctx = document.getElementById('myChart');
    const degSym = String.fromCharCode(176);

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.epochs,
            datasets: [
                {
                    label: 'Loss',
                    data: data.losses,
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

