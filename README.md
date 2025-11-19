# Collaborative AI Code Editor

A real-time collaborative code editor featuring intelligent code completion powered by **Google Gemini AI**. Built with **Angular 18** (Frontend) and **Node.js** (Backend) as a Mock Programming Project.

## 🚀 Features

- **Real-time Collaboration:** Multiple users can edit the same document simultaneously with sub-millisecond latency.
- **Live Presence:** Visualize other users' cursors and selections in real-time with unique, randomly generated colors.
- **AI Code Completion:** Intelligent code suggestions triggered by typing or `Ctrl+Space`, powered by Google's **Gemini** model.
- **Secure Architecture:** API keys are secured on the backend proxy; frontend never exposes secrets.

---

## 🛠️ Tech Stack

### Frontend (Client)

- **Framework:** Angular (Standalone Components)
- **Language:** TypeScript
- **Editor Engine:** CodeMirror 6
- **Collaboration:** `yjs`, `y-websocket`, `y-codemirror.next`
- **Styling:** CSS3, Flexbox

### Backend (Server)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Real-time Engine:** `ws` (WebSocket), `y-websocket`
- **AI Integration:** `@google/generative-ai` SDK

---

## ⚙️ Architecture Overview

The application uses a split architecture to handle low-latency collaboration and secure AI requests separately.

### 1. Real-time Collaboration Flow (WebSockets)

- Users connect to a specific "room" via **WebSockets**.
- The backend acts as a relay server using `y-websocket`.
- When User A types, a compact binary update is broadcast instantly to User B.
- **Yjs** handles conflict resolution automatically (CRDTs), ensuring all users always see the same document state without merge conflicts.

### 2. AI Code Completion Flow (HTTP Proxy)

- **Trigger:** The user types or presses `Ctrl+Space`.
- **Frontend:** Captures the current editor content and sends it to the backend via `POST /api/complete`.
- **Backend Proxy:** The Node.js server receives the request, attaches the secure `GEMINI_API_KEY` (stored in `.env`), and constructs a prompt.
- **Gemini API:** The backend calls Google's Gemini API.
- **Response:** The AI suggestion is returned to the frontend and displayed in the CodeMirror autocomplete dropdown.

---

## 🔌 Setup & Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (Node Package Manager)
- A Google Gemini API Key (with **Generative Language API** enabled)

### 1. Clone the Repository

```bash
git clone https://github.com/maneesh2430293/collaborative-code-editor.git
cd collaborative-code-editor
```

### 2. Backend setup

cd backend
npm install

# Create environment file

# Create a new file named .env in the backend folder

# Content of .env:

# GEMINI_API_KEY=AIzaSy... (Your Actual Key)

# Start the Backend Application

npx nodemon src/server.ts

### 3. Frontend setup

cd frontend
npm install

# Start the Angular Application

ng serve -o

# Testing AI Completion

In the editor, type a partial function
Type function `calculateFibonacci(n) {` and wait. The AI should suggest the recursive logic.

Pause typing or press Ctrl + Space.

Select the suggestion marked with ✨ Gemini AI to insert the code.
