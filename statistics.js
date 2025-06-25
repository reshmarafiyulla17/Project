window.onload = function() {
    // Retrieve data from localStorage
    const wineData = JSON.parse(localStorage.getItem('wineData'));
    
    if (!wineData) {
        alert('No wine data found!');
        window.location.href = 'index.html';  // Redirect to the main page
    }
    
    // Display statistics in the table
    const statsTable = document.getElementById('statsTable');
    statsTable.innerHTML = `
        <tr><td>Average Quality</td><td>${wineData.avgQuality.toFixed(2)}</td></tr>
        <tr><td>Minimum Quality</td><td>${wineData.minQuality}</td></tr>
        <tr><td>Maximum Quality</td><td>${wineData.maxQuality}</td></tr>
        <tr><td>Median Quality</td><td>${wineData.medianQuality}</td></tr>
        <tr><td>Standard Deviation</td><td>${wineData.standardDeviation.toFixed(2)}</td></tr>
    `;
};
