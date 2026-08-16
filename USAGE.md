# WorldBuilder - Quick Start Guide

Welcome to WorldBuilder, an interactive AI scenario and world-roleplay application!

This guide will help you get the project up and running locally so you can start exploring custom RPG scenarios.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (Version 18.17.0 or higher recommended)
- `npm` (comes bundled with Node.js)
- An active [OpenRouter API Key](https://openrouter.ai/keys)

## Installation

1.  **Clone the repository** (if you haven't already) and navigate to the project root directory.

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a new file named `.env.local` in the root directory of the project. Add your OpenRouter API key to this file like so:
    ```env
    OPENROUTER_API_KEY=your_actual_api_key_here
    ```

## Running the Application

Once dependencies are installed and the API key is configured, start the local development server:

```bash
npm run dev
```

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## How to Use the App

1.  **Configure Model (Optional):** In the sidebar, you can specify an OpenRouter model ID in the text input box. It defaults to `meta-llama/llama-3.3-70b-instruct`.
2.  **Select a Scenario:** On the left side of the screen (or by opening the hamburger menu on mobile), you will see a list of available worlds and scenarios (e.g., Neon Veridia, Station 7G). Click on a scenario to start your adventure.
3.  **Take Action:** Use the text input box at the bottom of the main window to declare your actions to the Game Master. Press `Enter` to submit, or `Shift + Enter` to add a new line.
4.  **Switch Scenarios or Models:** You can switch the scenario or the model at any time from the sidebar. Note: Changing either will reset your current adventure history.

## Further Documentation

For more detailed information on how the application works under the hood and how to add your own custom scenarios, please refer to the files inside the `documentation/` folder.
