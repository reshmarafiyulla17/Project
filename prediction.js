window.onload = function() {
    // Retrieve data from localStorage
    const wineData = JSON.parse(localStorage.getItem('wineData'));
    
    if (!wineData) {
        alert('No wine data found!');
        window.location.href = 'index.html';  // Redirect to the main page
    }

    // Display the prediction chart
    const ctx = document.getElementById('predictionChart').getContext('2d');
    const qualityCounts = wineData.qualityCounts;
    const labels = Object.keys(qualityCounts);
    const values = Object.values(qualityCounts);

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Wine Quality Distribution',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Quality'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Wines'
                    },
                    beginAtZero: true
                }
            }
        }
    });
};
