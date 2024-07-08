# Hotel Booking Chatbot

A conversational AI chatbot for hotel bookings, built with Express.js and React, powered by OpenAI's GPT model.

## Features

- Natural language interaction for hotel bookings
- Room availability checking
- Booking simulation
- Conversation history persistence

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- OpenAI API key

## Setup Instructions

1. Clone the repository: git clone git@github.com:androemeda/hotel-booking-bot.git
   cd hotel-booking-chatbot

2. Set up the backend: 
    cd backend
    npm install

3. Create a `.env` file in the `backend` directory with your OpenAI API key: 
    OPENAI_API_KEY=your_openai_api_key_here

4. Set up the frontend:
    cd ../frontend
    npm install

## Running the Application

1. Start the backend server:
    cd backend
    npm start

The server will run on `http://localhost:3001`.

2. In a new terminal, start the frontend development server: 
    cd frontend
    npm start

The React app will run on `http://localhost:3000`.

3. Open your browser and navigate to `http://localhost:3000` to use the chatbot.

## Demonstration Video
https://drive.google.com/file/d/1KpLjURpOiY9Sh3XiprXOE5QFaZPi8P7s/view?usp=sharing