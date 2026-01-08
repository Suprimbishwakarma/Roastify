// OAuth 2.0 implementation.

import spotifyAPI from "../config/spotify.js";
import jwt from "jsonwebtoken";

const loggedIn = async (req, res) => {
  // scope similar to permission to be granted for web app.
  const scope = [
    "user-read-private",
    "user-read-email",
    "user-read-currently-playing",
    "user-top-read",
    "user-read-recently-played",
  ];

  // Ensure URI is set
  spotifyAPI.setRedirectURI(process.env.SPOTIFY_REDIRECT_URI);
  spotifyAPI.setClientId(process.env.SPOTIFY_CLIENT_ID);
  
  const authURL = spotifyAPI.createAuthorizeURL(scope, null, true);

  // STOP! DO NOT REDIRECT AUTOMATICALLY.
  // We will show the user EXACTLY what is being sent so they can find the typo.
  res.send(`
    <html>
      <body style="font-family: sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: #d32f2f;">🛑 Debug Mode: Check Your Settings</h1>
        <p>We paused the redirect so you can verify your settings.</p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #ccc;">
          <h3>1. Variables from Vercel:</h3>
          <p><strong>Redirect URI:</strong> <code style="background: #fff; padding: 4px; font-size: 1.2em;">${process.env.SPOTIFY_REDIRECT_URI}</code></p>
          <p><strong>Client ID:</strong> <code>${process.env.SPOTIFY_CLIENT_ID}</code></p>
        </div>

        <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #2196f3;">
          <h3>2. Action Required:</h3>
          <p>Go to your <a href="https://developer.spotify.com/dashboard" target="_blank">Spotify Developer Dashboard</a>.</p>
          <p>Check "Redirect URIs". It <strong>MUST</strong> match the Redirect URI above <strong>EXACTLY</strong>.</p>
          <ul>
            <li>Check for <strong>https</strong> vs <strong>http</strong></li>
            <li>Check for trailing slashes (e.g. <code>/callback/</code> vs <code>/callback</code>)</li>
            <li>Check for spaces</li>
          </ul>
        </div>

        <h3>3. Attempt Login</h3>
        <p>If the values match exactly, clicking this button should work:</p>
        <p><a href="${authURL}" style="background: #1DB954; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 1.1em;">Isolating the Error -> Click to Login</a></p>
      </body>
    </html>
  `);
};

const getCallback = async (req, res) => {
  // simple authorization code that we get from the authURL.
  const { code } = req.query;

  try {
    // Exchanging the authorization code for access and refresh token.
    const data = await spotifyAPI.authorizationCodeGrant(code);
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = data.body;

    // setting accessToken and refreshToken.
    spotifyAPI.setAccessToken(accessToken);
    spotifyAPI.setRefreshToken(refreshToken);

    // getting user info to pass into jwt as a payload.
    const userInfo = await spotifyAPI.getMe();
    const spotifyUser = userInfo.body;

    const jwtToken = jwt.sign(
      {
        userId: spotifyUser.display_name,
        email: spotifyUser.email,
        accessToken: accessToken,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    req.session.userId = spotifyUser.display_name; // stores user Id in session.
    req.session.accessToken = accessToken; // stores accessToken in session.

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${jwtToken}`); // redirects to the dashboard
  } catch (error) {
    console.error("Auth error: ", error);
    res.redirect(`${process.env.FRONTEND_URL}?error=auth_failed`); // redirects an error.
  }
};

export { getCallback, loggedIn };
