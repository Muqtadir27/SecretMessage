const fs = require('fs');

/**
 * Converts a numeric string in a given base to a decimal number.
 * Uses JavaScript's built-in parseInt.
 * @param {string} value - The numeric string.
 * @param {number} base - The base of the numeric string.
 * @returns {number} The decimal number.
 */
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

/**
 * Calculates Lagrange interpolation.
 * Given an array of points and a target xValue, returns the interpolated y-value.
 * @param {Array} points - Array of point objects { x, y }.
 * @param {number} xValue - The x value at which to evaluate the polynomial.
 * @returns {number} The interpolated y-value.
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

/**
 * Processes a JSON file, extracts polynomial points, selects the required points,
 * and calculates the constant term (c) using Lagrange interpolation.
 * @param {string} fileName - The JSON file name.
 * @param {Function} selectionFn - A function that selects the desired subset of points.
 * @param {Function} callback - Callback invoked with (err, fileName, cValue).
 */
function processFile(fileName, selectionFn, callback) {
    fs.readFile(fileName, 'utf8', (err, jsonData) => {
        if (err) {
            console.error(`Error reading file ${fileName}:`, err);
            callback(err);
            return;
        }
        let data;
        try {
            data = JSON.parse(jsonData);
        } catch (parseErr) {
            console.error(`Error parsing JSON in ${fileName}:`, parseErr);
            callback(parseErr);
            return;
        }

        // Extract points from JSON (ignore the "keys" entry)
        let points = [];
        for (const key in data) {
            if (key === "keys") continue;
            let x = parseInt(key, 10);
            let base = parseInt(data[key]["base"], 10);
            let y = convertToDecimal(data[key]["value"], base);
            points.push({ x, y });
        }

        // Select the appropriate points using the selection function
        const selectedPoints = selectionFn(data, points);

        // Calculate the constant term (c) at x = 0 using Lagrange interpolation
        const cValue = lagrangeInterpolation(selectedPoints, 0);
        callback(null, fileName, cValue);
    });
}

/**
 * Selection function for data1.json:
 * Uses the threshold k provided in the "keys" object to select the first k points.
 */
function selectData1Points(data, points) {
    const k = parseInt(data.keys.k, 10);
    return points.slice(0, k);
}

/**
 * Selection function for data.json:
 * Selects the first 3 points for quadratic interpolation.
 */
function selectDataPoints(data, points) {
    return points.slice(0, 3);
}
// Process data.json
processFile('data.json', selectData1Points, (err, fileName, cValue) => {
    if (!err) {
        console.log(`For file ${fileName}, calculated constant term (c): ${cValue}`);
    }
});
// Process data1.json
processFile('data1.json', selectData1Points, (err, fileName, cValue) => {
    if (!err) {
        console.log(`For file ${fileName}, calculated constant term (c): ${cValue}`);
    }
});
