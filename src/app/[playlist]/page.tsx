"use client";
import { useEffect, useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { Playlist } from "@spotify/web-api-ts-sdk";

export default function PlaylistPage() {
  const sdk = useSpotify();
  const path = window.location.pathname;
  const parts = path.split("/");
  const playlistId = parts.pop();

  const [playlist, setPlaylist] = useState<Playlist>();

  useEffect(() => {
    sdk?.playlists.getPlaylist(playlistId).then((res) => setPlaylist(res));
  }, [playlistId]);

  if (!sdk) {
    <div>Loading...</div>;
  }

  return (
    <div>
      Playlist page{" "}
      {playlist?.tracks.items.map((track, index) => (
        <div key={"track" + index}>{track.track.name}</div>
      ))}
    </div>
  );
}
