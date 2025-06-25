document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        alert("Please select a CSV file.");
        return;
    }

    const reader = new FileReader();
    
    reader.onload = function(e) {
        const contents = e.target.result;
        processCSV(contents);
    };

    reader.readAsText(file);
}

function processCSV(csv) {
    const rows = csv.trim().split('\n');
    const header = rows[0].split(',').map(item => item.trim());
    const data = rows.slice(1).map(row => row.split(',').map(item => item.trim()));

    const qualityColumnIndex = header.indexOf('quality');

    if (qualityColumnIndex === -1) {
        alert("Quality column not found.");
        return;
    }

    const qualityData = data.map(row => parseInt(row[qualityColumnIndex])).filter(Number.isInteger);

    const totalWines = qualityData.length;
    const avgQuality = qualityData.reduce((acc, value) => acc + value, 0) / totalWines;
    const minQuality = Math.min(...qualityData);
    const maxQuality = Math.max(...qualityData);
    const qualityCounts = countOccurrences(qualityData);

    // New statistics
    const medianQuality = calculateMedian(qualityData);
    const standardDeviation = calculateStandardDeviation(qualityData, avgQuality);

    // Store the data in localStorage
    localStorage.setItem('wineData', JSON.stringify({
        avgQuality,
        minQuality,
        maxQuality,
        medianQuality,
        standardDeviation,
        qualityCounts,
        qualityData
    }));

    // Show the "Go to Prediction Page" button
    document.getElementById('goToPredictionPage').style.display = 'block';
}

function countOccurrences(arr) {
    return arr.reduce((acc, value) => {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
}

function calculateMedian(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
        return sorted[middle];
    }
}

function calculateStandardDeviation(arr, mean) {
    const variance = arr.reduce((acc, value) => acc + Math.pow(value - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
}

document.getElementById('goToPredictionPage').addEventListener('click', function() {
    window.location.href = 'prediction.html';
});
