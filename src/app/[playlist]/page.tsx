"use client";
import { useEffect, useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { Playlist } from "@spotify/web-api-ts-sdk";
import TrackItem from "./trackItem";
import styles from "./page.module.css";

export default function PlaylistPage() {
  const sdk = useSpotify();
  const path = window.location.pathname;
  const parts = path.split("/");
  const playlistId = parts.pop();

  const [playlist, setPlaylist] = useState<Playlist>();

  useEffect(() => {
    sdk?.playlists.getPlaylist(playlistId).then((res) => setPlaylist(res));
  }, [playlistId, sdk]);

  if (!sdk) {
    console.log("no sdk");
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.trackContainer}`}>
      Playlist page{playlist?.name}
      <div className={`${styles.trackContainer}`}>
        {playlist?.tracks.items.map((track, index) => (
          <div key={"track" + index} className={`${styles.trackItem}`}>
            <TrackItem track={track.track} />
          </div>
        ))}
      </div>
    </div>
  );
}
