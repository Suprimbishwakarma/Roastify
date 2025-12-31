import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const processUserData = (userData) => {
  const topArtists = userData.topArtistsShort?.map((a) => a.name || []);
  const topTracks =
    userData.topTracksShort?.map((t) => `${t.name} by ${t.artists[0].name}`) ||
    [];
  const allGenres = userData.topArtistsShort?.flatMap((a) => a.genres) || [];
  const genres = [...new Set(allGenres)];
  const playlistNames = userData.playlists?.map((p) => p.name) || [];

  return {
    topArtists,
    topTracks,
    genres,
    playlistNames,
    playlistCount: userData.playlists?.length || 0,
    currentlyPlaying: userData.currentlyPlaying?.item?.name || "Nothing",
  };
};

const getRoastSystemPrompt = (roastType) => {
  const prompts = {
    gentle:
      "You are a friendly music enthusiast who playfully teases people's music taste. Be witty but kind.",
    medium:
      "You are a sarcastic music critic who roasts people's music taste. Be funny and sharp, but not cruel.",
    brutal:
      "You are a savage music critic with no filter. Roast this person's music taste mercilessly and creatively. Still keep it sun, not genuinely mean.",
  };

  const createRoastPrompt = (musicProfile, roastType) => {
    return `
        Roast this person's music taste based on their Spotify data. Make it ${roastType} intensity.
        **The user's music profile:**
        - topArtists: ${musicProfile.topArtists.slice(0, 10).join(",")}
        - topSongs: ${musicProfile.topTracks.slice(0, 5).join(",")}
        - Favorite genre: ${musicProfile.genres.slice(0, 8).join(",")}
        - Number of Playlists: ${musicProfile.playlistCount}
        - currently Playing: ${musicProfile.currentlyPlaying}

        Generate a hilarious, creative roast (150-200 words). Reference specific artists and genres. Use emojis. Make it shareable!
        `;
  };
};

const generateRoast = async (req, res) => {
  try {
    const { userData, roastType = "medium" } = req.body;
    const userId = req.user?.userId;
    console.log("Debug-Auth Check: ", {
      userId,
      hasApiKey: !!process.env.GEMINI_API_KEY,
    });

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API key is missing in server environment");
      return res
        .status(500)
        .json({ error: "Server configuration error: Missing API key" });
    }

    const musicProfile = processUserData(userData);
    const prompt = createRoastPrompt(musicProfile, roastType);

    // Ai model definition
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
    });

    // prompt to be passed to the AI model
    const combinedPrompt = `${getRoastSystemPrompt(roastType)}\n\n${prompt}`;

    // Passing the prompt go the gemini flash lite latest AI model
    const result = await model.generateContent(combinedPrompt);
    const response = result.response;
    const roastContent = response.text();

    // Sending the response back to the frontend
    res.json({
      roast: roastContent,
      roastId: Date.now().toString(),
      metadata: {
        type: roastType,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error("Roast generation error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate roast!", details: error.message });
  }
};

export default generateRoast;
