<div align="center">

# 🔥 Roastify

### Get Hilariously Roasted Based on Your Spotify Music Taste!

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.2.1-lightgrey.svg)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-brightgreen.svg)](https://nodejs.org/)

**Roastify** takes your Spotify listening history and serves up a savage, witty AI-generated roast of your music taste. Choose your roast intensity and brace yourself! 🎵💀

</div>

---

## 📖 About The Project

**Roastify** is a fun web application that connects to your Spotify account, analyzes your top artists, tracks, genres, and playlists, and uses Google's Gemini AI to generate personalized, hilarious roasts about your music taste. Whether you want a gentle tease or a brutal takedown, Roastify delivers entertainment with personality!

<video width="1366" height="768" alt="video" src="https://github.com/user-attachments/assets/463bad1a-69f1-4c84-8015-d11db3c36691"></video>

### ✨ Key Features

- 🎯 **Spotify OAuth Integration** - Secure login via Spotify
- 🤖 **AI-Powered Roasts** - Generated using Google Gemini Flash Lite
- 🎚️ **Three Roast Levels** - Gentle, Medium, or Brutal intensity
- 📊 **Music Statistics** - View your top artists, tracks, and genres
- 🔒 **Secure & Private** - Read-only access, never modifies your data
- 🎨 **Modern UI** - Built with React and sleek styling
- ⚡ **Rate Limited** - Protected API endpoints to prevent abuse
- 🛡️ **Security First** - Helmet, CORS, JWT authentication

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP requests
- **React Icons** - Beautiful icons

### Backend

- **Node.js** - Runtime environment
- **Express 5.2** - Web framework
- **Spotify Web API** - Music data source
- **Google Generative AI** - Gemini for roast generation
- **JWT** - Secure authentication tokens
- **Express Rate Limit** - API protection
- **Helmet** - Security headers
- **Express Session** - Session management

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Spotify Developer Account** ([Create one here](https://developer.spotify.com/))
- **Google Gemini API Key** ([Get yours here](https://ai.google.dev/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Suprimbishwakarma/Roastify.git
   cd Roastify
   ```

2. **Set up the Server**

   ```bash
   cd server
   npm install
   ```

3. **Set up the Client**

   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the `server` directory:

   ```env
   # Server Configuration
   PORT=3000
   FRONTEND_URL=http://localhost:5173

   # Spotify API Credentials
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SPOTIFY_REDIRECT_URI=http://localhost:3000/auth/callback

   # Google Gemini API
   GEMINI_API_KEY=your_gemini_api_key

   # Session Secret
   SESSION_SECRET=your_random_session_secret_key

   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   ```

   **How to get Spotify credentials:**

   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Add `http://localhost:3000/auth/callback` to Redirect URIs
   - Copy Client ID and Client Secret

5. **Run the Application**

   In the `server` directory:

   ```bash
   npm run dev
   ```

   In the `client` directory (new terminal):

   ```bash
   npm run dev
   ```

6. **Access the App**

   Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

---

## 📂 Project Structure

```
Roastify/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── LoadingSpinner/
│   │   │   ├── MusicStats/
│   │   │   └── RoastDisplay/
│   │   ├── pages/         # Page components
│   │   │   ├── Dashboard/
│   │   │   └── Landing/
│   │   ├── utils/         # API utilities
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Express application
│   ├── config/            # Configuration files
│   │   └── spotify.js     # Spotify API setup
│   ├── controllers/       # Route controllers
│   │   ├── auth.controller.js
│   │   ├── fetch.controller.js
│   │   └── roast.controller.js
│   ├── middleware/        # Custom middleware
│   │   └── verifyToken.js
│   ├── routes/            # API routes
│   │   ├── auth.route.js
│   │   ├── fetch.route.js
│   │   └── roast.route.js
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point
│   └── package.json
│
├── LICENSE
└── README.md
```

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint         | Description                    |
| ------ | ---------------- | ------------------------------ |
| GET    | `/auth/login`    | Initiates Spotify OAuth flow   |
| GET    | `/auth/callback` | Handles Spotify OAuth callback |

### Data Routes (Protected)

| Method | Endpoint             | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/data/user`         | Fetches user's combined music data |
| GET    | `/data/playlist/:id` | Fetches specific playlist details  |

### Roast Routes (Protected)

| Method | Endpoint          | Description                             |
| ------ | ----------------- | --------------------------------------- |
| POST   | `/roast/generate` | Generates AI roast based on music taste |

**Request Body for `/roast/generate`:**

```json
{
  "userData": {
    "topArtistsShort": [...],
    "topTracksShort": [...],
    "playlists": [...],
    "currentlyPlaying": {...}
  },
  "roastType": "gentle" | "medium" | "brutal"
}
```

---

## 🎨 Features in Detail

### 🎭 Roast Intensity Levels

1. **Gentle** 🌱

   - Friendly, playful teasing
   - Perfect for sensitive souls
   - Witty but kind commentary

2. **Medium** ⚡

   - Sarcastic music critic vibes
   - Sharp and funny
   - Not cruel, just honest

3. **Brutal** 💀
   - No filter, pure savagery
   - Merciless creative roasting
   - Still fun, not mean-spirited

### 📊 Music Analysis

Roastify analyzes:

- ✅ Top Artists (short-term)
- ✅ Top Tracks (short-term)
- ✅ Favorite Genres
- ✅ Playlist Count & Names
- ✅ Currently Playing Song

### 🔐 Security Features

- Rate limiting on all endpoints
- JWT-based authentication
- Helmet security headers
- CORS protection
- Session management
- Environment variable security

---

## 🎯 Usage

1. **Login** - Click "Roast My Music Taste" and authorize with Spotify
2. **View Stats** - Check out your music statistics on the dashboard
3. **Choose Intensity** - Pick your roast level (gentle, medium, or brutal)
4. **Get Roasted** - Receive your personalized AI-generated roast
5. **Share** - Share your roast with friends (if you dare!)

---

## 📝 License

Distributed under the MIT License.

---

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [Google Generative AI (Gemini)](https://ai.google.dev/)
- [React Documentation](https://react.dev/)
- [Express.js](https://expressjs.com/)
- [Vite](https://vitejs.dev/)

---
