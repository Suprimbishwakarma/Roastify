import spotifyAPI from "../config/spotify.js";

const getUserdata = async (req, res) => {
  try {
    // Set access token from the session before making requests
    if (req.user && req.user.accessToken) {
      spotifyAPI.setAccessToken(req.user.accessToken);
    } else {
      // If there is no access token, return an error
      return res
        .status(401)
        .json({ error: "No active Spotify session. Please login again." });
    }

    // fetch user profile
    const [
      userData,
      topTracksShort,
      topArtistsShort,
      topTracksMedium,
      topArtistsMedium,
      recentTracks,
      playlists,
      currentlyPlaying,
    ] = await Promise.allSettled([
      spotifyAPI.getMe(),
      spotifyAPI.getMyTopTracks({ time_range: "short_term", limit: 50 }),
      spotifyAPI.getMyTopArtists({ time_range: "short_term", limit: 50 }),
      spotifyAPI.getMyTopTracks({ time_range: "medium_term", limit: 50 }),
      spotifyAPI.getMyTopArtists({ time_range: "medium_term", limit: 50 }),
      spotifyAPI.getMyRecentlyPlayedTracks({ limit: 50 }),
      spotifyAPI.getUserPlaylists({ limit: 50 }),
      spotifyAPI.getMyCurrentPlayingTrack(),
    ]);

    const response = {
      user: userData.value?.body || null,
      topTracksShort: topTracksShort.value?.body.items || [],
      topArtistsShort: topArtistsShort.value?.body.items || [],
      topTracksMedium: topTracksMedium.value?.body.items || [],
      topArtistsMedium: topArtistsMedium.value?.body.items || [],
      recentTracks: recentTracks.value?.body.items || [],
      playlists: playlists.value?.body.items || [],
      currentlyPlaying: currentlyPlaying.value?.body || [],
    };

    res.json(response);
  } catch (error) {
    console.error("Spotify data fetch error: ", error);
    res.status(500).json({ error: error.message });
  }
};

const getUserPlaylists = async (req, res) => {
  try {
    // Set access token from the session before making requests
    if (req.user?.accessToken) spotifyAPI.setAccessToken(req.user.accessToken);
    const playlist = await req.spotifyAPI.getUserPlaylists(req.params.id);
    res.json(playlist.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUserdata, getUserPlaylists };
