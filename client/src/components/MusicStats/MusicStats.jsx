import React from "react";
import "./MusicStats.css";

const MusicStats = ({ userData }) => {
  const topArtists = userData.topArtistsShort || [];
  const topTracks = userData.topTracksShort || [];
  const genres = [
    ...new Set((userData.topArtistsShort || []).flatMap((a) => a.genres)),
  ].slice(0, 10);
  return (
    <div className="music-stats">
      <section className="stats-section">
        <h3>🎤 TOP ARTISTS</h3>
        <div className="artist-grid">
          {topArtists.slice(0, 6).map((artist, index) => (
            <div key={artist.id} className="artist-card">
              <div className="rank-badge">#{index + 1}</div>
              {artist.images[0] && (
                <img src={artist.images[0].url} alt={artist.name} />
              )}
              <p className="artist-name">{artist.name}</p>
              <p className="artist-genres">
                {artist.genres.slice(0, 2).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h3>🎵 TOP TRACKS</h3>
        <div className="track-list">
          {topTracks.slice(0, 10).map((track, index) => (
            <div key={track.id} className="track-item">
              <span className="track-number">{index + 1}</span>
              {track.album.images[2] && (
                <img src={track.album.images[2].url} alt={track.name} />
              )}
              <div className="track-info">
                <p className="track-name">{track.name}</p>
                <p className="track-artist">
                  {track.artists.map((a) => a.name).join(",")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h3>🎸 GENRES</h3>
        <div className="genre-tags">
          {genres.map((genre, index) => (
            <span key={index} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MusicStats;
