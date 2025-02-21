const fs = require('fs');

/**
 * Function to convert a number from a given base to base 10.
 * Uses JavaScript's built-in parseInt.
 */
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

/**
 * Function to calculate Lagrange interpolation.
 * Given an array of points and a target xValue, it returns the interpolated y-value.
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

// Read the JSON file "data1.json"
fs.readFile('data1.json', 'utf8', (err, jsonData) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    // Parse the JSON data
    const data1 = JSON.parse(jsonData);

    // Extract points from the JSON (ignoring the "keys" entry)
    let points = [];
    for (const key in data1) {
        if (key !== "keys") {
            let x = parseInt(key, 10); // Convert key to integer
            let base = parseInt(data1[key]["base"], 10); // Extract base
            let y = convertToDecimal(data1[key]["value"], base); // Convert encoded value to decimal

            points.push({ x, y });
        }
    }

    // Use the threshold k provided in the keys (for data1, k is 7)
    const k = parseInt(data1.keys.k, 10);
    // Select the first k points (you can change the selection logic if needed)
    let selectedPoints = points.slice(0, k);

    // Calculate the constant term (c) at x = 0 using Lagrange interpolation
    let cValue = lagrangeInterpolation(selectedPoints, 0);

    console.log("Calculated Constant Term (c):", cValue);
});
