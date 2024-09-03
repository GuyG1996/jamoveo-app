# JaMoveo Web App

## Overview

The **JaMoveo** web application is designed for Moveo band rehearsals, allowing users to log in, choose their instrument, and participate in real-time song sessions controlled by an admin. Admins can search for songs, select one, and broadcast its lyrics and chords to all players. The app supports both English and Hebrew songs.

## Features

- **User Signup and Login**: Register as a player (e.g., guitarist, drummer, vocalist) or as an admin.
- **Real-Time Session Management**: Admins can start sessions, search for songs, and control the display for all users.
- **Dynamic Display**: Players see chords and lyrics; vocalists see only lyrics. Admins control the session flow.
- **Responsive Design**: Suitable for mobile devices used in rehearsal rooms.

## Tech Stack

- **Frontend**: React.js, Socket.IO Client
- **Backend**: Node.js, Express.js, Socket.IO Server
- **Database**: MongoDB Atlas
- **Deployment**: Render.com

## Setup Instructions

### Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/jamoveo-web-app.git
   cd jamoveo-web-app
   ```

2. **Install dependencies**:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Set up environment variables** locally (only if running locally and not on Render):

   - Create a `.env` file in the `backend` directory:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:3000
   ```

   - Create a `.env` file in the `frontend` directory:

   ```plaintext
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

4. **Start the servers**:

   ```bash
   cd backend && npm start
   cd ../frontend && npm start
   ```

5. **Access the application**:

   - Navigate to `http://localhost:3000` in your web browser.

## Live Application

Access the live application at:

- **live application**: [JaMoveo app](https://jamoveo-app-frontend.onrender.com)
