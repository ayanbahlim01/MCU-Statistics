// Marvel Movie Data with labels, production budgets, and worldwide box office
const movieData = {
    labels: [
        "Iron Man (2008)", "The Incredible Hulk (2008)", "Iron Man 2 (2010)", "Thor (2011)", "Captain America (2011)",
        "The Avengers (2012)", "Iron Man 3 (2013)", "Thor: The Dark World (2013)", "Captain America 2 (2014)", 
        "Guardians of the Galaxy (2014)", "Avengers: Age of Ultron (2015)", "Ant-Man (2015)", "Captain America 3 (2016)",
        "Doctor Strange (2016)", "Guardians of the Galaxy 2 (2017)", "Spider-Man: Homecoming (2017)", 
        "Thor: Ragnarok (2017)", "Black Panther (2018)", "Avengers: Infinity War (2018)", "Ant-Man 2 (2018)",
        "Captain Marvel (2019)", "Avengers: Endgame (2019)", "Spider-Man 2 (2019)", "Black Widow (2021)", 
        "Shang-Chi (2021)", "Eternals (2021)", "Spider-Man: No Way Home (2021)", "Doctor Strange 2 (2022)", 
        "Thor: Love and Thunder (2022)", "Black Panther 2 (2022)", "Ant-Man 3 (2023)", "Guardians 3 (2023)", 
        "The Marvels (2023)", "Deadpool & Wolverine (2024)"
    ],
    budgets: [186000000, 137500000, 170000000, 150000000, 140000000, 225000000, 200000000, 150000000, 170000000, 170000000,
              365000000, 130000000, 250000000, 165000000, 200000000, 175000000, 180000000, 200000000, 300000000, 130000000,
              175000000, 400000000, 160000000, 200000000, 150000000, 200000000, 200000000, 200000000, 250000000, 250000000,
              200000000, 250000000, 274800000, 200000000],
    boxOffice: [585000000, 266000000, 622000000, 449000000, 370000000, 1515000000, 1215000000, 644000000, 714000000, 
                770000000, 1395000000, 519000000, 1152000000, 677000000, 869000000, 880000000, 854000000, 1344000000, 
                2048000000, 623000000, 1129000000, 2748000000, 1132000000, 380000000, 432000000, 402000000, 1921000000, 
                952000000, 761000000, 854000000, 464000000, 845000000, 199706250, 1335000000]
};

// Calculate profit/loss percentages based on budget and box office
const profitLossData = movieData.budgets.map((budget, index) => {
    const boxOffice = movieData.boxOffice[index];
    const profitLossPercentage = ((boxOffice - budget) / budget) * 100;
    return profitLossPercentage;
});

// Function to abbreviate large numbers to K, M, or B
function formatNumber(value) {
    if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";
    return value;
}

// Bar Chart for Profit/Loss
const barCtx = document.getElementById("profitLossBarChart").getContext("2d");
new Chart(barCtx, {
    type: "bar",
    data: {
        labels: movieData.labels,
        datasets: [{
            label: "Profit/Loss (%)",
            data: profitLossData,
            backgroundColor: profitLossData.map(value => value > 0 ? "#4CAF50" : "#F44336"),
            borderColor: "#333",
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (context) => context[0].label,
                    label: (context) => [
                        `Profit/Loss: ${context.raw.toFixed(2)}%`,
                        `Budget: ${formatNumber(movieData.budgets[context.dataIndex])}`,
                        `Box Office: ${formatNumber(movieData.boxOffice[context.dataIndex])}`
                    ]
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: "Movie Title" },
                ticks: { maxRotation: 90, minRotation: 45, font: { size: 10 } }
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Profit/Loss (%)" }
            }
        }
    }
});

// Line Graph for Profit/Loss
const lineCtx = document.getElementById("profitLossLineChart").getContext("2d");
new Chart(lineCtx, {
    type: "line",
    data: {
        labels: movieData.labels,
        datasets: [{
            label: "Profit/Loss (%)",
            data: profitLossData,
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            borderWidth: 2,
            pointBackgroundColor: profitLossData.map(value => value > 0 ? "#4CAF50" : "#F44336"),
            pointRadius: 4,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (context) => context[0].label,
                    label: (context) => [
                        `Profit/Loss: ${context.raw.toFixed(2)}%`,
                        `Budget: ${formatNumber(movieData.budgets[context.dataIndex])}`,
                        `Box Office: ${formatNumber(movieData.boxOffice[context.dataIndex])}`
                    ]
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: "Movie Title" },
                ticks: { maxRotation: 90, minRotation: 45, font: { size: 10 } }
            },
            y: {
                beginAtZero: true,
                title: { display: true, text: "Profit/Loss (%)" }
            }
        }
    }
});

// Pie Chart for Box Office Distribution
const pieCtx = document.getElementById("boxOfficePieChart").getContext("2d");
new Chart(pieCtx, {
    type: "pie",
    data: {
        labels: movieData.labels,
        datasets: [{
            label: "Box Office Distribution",
            data: movieData.boxOffice,
            backgroundColor: movieData.boxOffice.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
            borderColor: "#333",
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const movieIndex = context.dataIndex;
                        return [
                            context.label,
                            `Box Office: ${formatNumber(movieData.boxOffice[movieIndex])}`
                        ];
                    }
                }
            }
        }
    }
});

// Horizontal Bar Chart for Box Office Collection
const horizontalBarCtx = document.getElementById("boxOfficeHorizontalBarChart").getContext("2d");
new Chart(horizontalBarCtx, {
    type: "bar",
    data: {
        labels: movieData.labels,
        datasets: [{
            label: "Box Office Collection",
            data: movieData.boxOffice,
            backgroundColor: "#2196F3",
            borderColor: "#333",
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        indexAxis: 'y', // Change to horizontal
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    title: (context) => context[0].label,
                    label: (context) => [
                        `Box Office: ${formatNumber(context.raw)}`
                    ]
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                title: { display: true, text: "Box Office Collection" }
            },
            y: {
                title: { display: true, text: "Movie Title" }
            }
        }
    }
});

// Scatter Plot for Box Office vs Budget
const scatterCtx = document.getElementById("boxOfficeScatterPlot").getContext("2d");
new Chart(scatterCtx, {
    type: "scatter",
    data: {
        datasets: [{
            label: "Box Office vs Budget",
            data: movieData.budgets.map((budget, index) => ({
                x: budget,
                y: movieData.boxOffice[index],
                r: 5 // Point size
            })),
            backgroundColor: "#FF5722",
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const index = context.dataIndex;
                        return [
                            `Budget: ${formatNumber(movieData.budgets[index])}`,
                            `Box Office: ${formatNumber(movieData.boxOffice[index])}`
                        ];
                    }
                }
            }
        },
        scales: {
            x: {
                title: { display: true, text: "Budget" },
                beginAtZero: true
            },
            y: {
                title: { display: true, text: "Box Office" },
                beginAtZero: true
            }
        }
    }
});
