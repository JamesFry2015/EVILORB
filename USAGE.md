# PersonaAI - Quick Start Guide

Welcome to PersonaAI, an interactive AI roleplay chatbot application!

This guide will help you get the project up and running locally so you can start chatting with your new AI companions.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (Version 18.17.0 or higher recommended)
- `npm` (comes bundled with Node.js)
- An active [OpenAI API Key](https://platform.openai.com/api-keys)

## Installation

1.  **Clone the repository** (if you haven't already) and navigate to the project root directory.

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a new file named `.env.local` in the root directory of the project. Add your OpenAI API key to this file like so:
    ```env
    OPENAI_API_KEY=your_actual_api_key_here
    ```

## Running the Application

Once dependencies are installed and the API key is configured, start the local development server:

```bash
npm run dev
```

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## How to Use the App

1.  **Select a Character:** On the left side of the screen (or by opening the hamburger menu on mobile), you will see a list of available personas (e.g., Elara Sunweaver, Jax Vance). Click on a character to start a conversation with them.
2.  **Chat:** Use the text input box at the bottom of the main chat window to send messages. Press `Enter` to send, or `Shift + Enter` to add a new line.
3.  **Switch Characters:** You can switch characters at any time by selecting a different one from the sidebar. Note: Switching characters will reset your current chat history.

## Further Documentation

For more detailed information on how the application works under the hood and how to add your own custom characters, please refer to the files inside the `documentation/` folder.
