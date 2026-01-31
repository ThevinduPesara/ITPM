# IT3040 - Assignment 1: Test Automation with Playwright

This project contains automated tests for the SwiftTranslator Singlish to Sinhala conversion system using Playwright.

##  Prerequisites

Before running the tests, ensure you have the following installed on your machine:

1.  **Node.js** (v14 or higher)
    * Download: [https://nodejs.org/](https://nodejs.org/)
    * Verify installation: `node -v`
2.  **Visual Studio Code** (Recommended)

##  Installation & Setup

Follow these steps to set up the project from scratch:

### Step 1: Clone or Download the Repository

## Repository Link

  https://github.com/ThevinduPesara/ITPM

If you have the project as a zip file, extract it. If it's a Git repository:

```bash
git clone https://github.com/ThevinduPesara/ITPM
cd ITPM
```

### Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

### Step 3: Install Playwright Browsers

After installing dependencies, install the required browsers:

```bash
npx playwright install chromium
```


##  Project Structure

* `tests/pos_fun.spec.js` - Contains **24 Positive Functional** test cases.
* `tests/neg_fun.spec.js` - Contains **10 Negative/Robustness** test cases.
* `playwright.config.js` - Configuration settings for the test runner.
* `package.json` - Project dependencies.


##  How to Run Tests

You can run the tests using the following commands in the VS Code terminal.

###  Run All Tests (Headless Mode)
This runs all 34 test cases in the background (fastest method).
```bash
npx playwright test tests/pos_fun.spec.js tests/neg_fun.spec.js --project=chromium --headed --workers=1
```
