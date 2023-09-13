"use client";
import Image from "next/image";
import styles from "./page.module.css";
import spotifyImage from "./../../public/spotify.png";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export default function Home() {
  async function getSpotifyToken() {
    const sdk = SpotifyApi.withUserAuthorization(clientId, redirectUri);
    console.log(sdk.authenticate());
    console.log(await sdk.currentUser.unfollowArtistsOrUsers));
  }

  return (
    <div className={`${styles.homeWrapper}`}>
      <Image
        onClick={getSpotifyToken}
        className={`${styles.spotifyLogo}`}
        src={spotifyImage}
        alt="Spotify Image"
      />
    </div>
  );
}
