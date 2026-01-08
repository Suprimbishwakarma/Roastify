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

  // DEBUG LOGGING
  console.log("DEBUG: Configured Redirect URI:", spotifyAPI.getRedirectURI());
  
  // creates an authorization page.
  const authURL = spotifyAPI.createAuthorizeURL(scope, null, true);
  console.log("DEBUG: Generated Auth URL:", authURL);

  // redirects to the authorization page from spotify.
  res.redirect(authURL);
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
