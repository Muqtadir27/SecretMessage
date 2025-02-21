const fs = require('fs');

/**
 * Function to convert a number from a given base to base 10.
 */
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

/**
 * Function to calculate Lagrange interpolation.
 */
function lagrangeInterpolation(points, xValue) {
    let result = 0;
    let n = points.length;

    for (let i = 0; i < n; i++) {
        let term = points[i].y;
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (xValue - points[j].x) / (points[i].x - points[j].x);
            }
        }
        result += term;
    }
    return result;
}

// Read the JSON file
fs.readFile('data.json', 'utf8', (err, jsonData) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const data = JSON.parse(jsonData);

    // Extracting values
    let points = [];
    for (const key in data) {
        if (key !== "keys") {
            let x = parseInt(key); // Convert key to integer
            let base = parseInt(data[key]["base"]); // Extract base
            let y = convertToDecimal(data[key]["value"], base); // Convert to decimal

            points.push({ x, y });
        }
    }

    // Select first 3 points for quadratic interpolation
    let selectedPoints = points.slice(0, 3);

    // Find the constant term (when x = 0)
    let cValue = lagrangeInterpolation(selectedPoints, 0);

    console.log("Calculated Constant Term (c):", cValue);
});