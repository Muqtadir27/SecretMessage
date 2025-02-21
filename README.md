# Secret Message Constant Term Calculator

This repository demonstrates the calculation of the constant term (c) of a polynomial using Lagrange interpolation. The project processes JSON data using Node.js. The constant term represents the value of the polynomial when \( x = 0 \).

## Overview

The repository contains three main scripts:

- **Main.js**  
  - **Purpose:** Processes `data.json` to calculate the constant term using the first 3 data points.  
  - **Output:** `Calculated Constant Term (c): 3`

- **Main1.js**  
  - **Purpose:** Processes `data1.json` to calculate the constant term using the threshold \( k \) specified in the JSON file.  
  - **Output:** `Calculated Constant Term (c): 271644355469312`

- **Main_c.js**  
  - **Purpose:** Processes both `data.json` and `data1.json` sequentially, outputting:
    - For `data.json`: `3`
    - For `data1.json`: `271644355469312`


## How It Works

- **Data Conversion:**  
  The function `convertToDecimal` converts numbers from a given base (as defined in the JSON files) to decimal using JavaScript's `parseInt`.

- **Lagrange Interpolation:**  
  The `lagrangeInterpolation` function computes the constant term of the polynomial (i.e., the value at \( x = 0 \)) using the standard Lagrange interpolation formula. It iterates over selected points and sums their contributions.

- **File Processing:**  
  - **Main.js:** Reads `data.json` and uses the first 3 points.
  - **Main1.js:** Reads `data1.json` and uses the first \( k \) points (where \( k \) is defined in the `"keys"` object).
  - **Main_c.js:** Combines both approaches to output results for both JSON files.

## Running the Project
### Prerequisites

- **Node.js:** Install Node.js from [nodejs.org](https://nodejs.org/).
- **VS Code (optional):** Use Visual Studio Code for a better development experience.

### Steps to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Muqtadir27/SecretMessage.git
   cd SecretMessage


