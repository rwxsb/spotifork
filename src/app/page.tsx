"use client";
import Image from "next/image";
import styles from "./page.module.css";
import spotifyImage from "./../../public/spotify.png";
import { AccessToken, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@/utils/supabase/component";
import { useState } from "react";
import { Session } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useSpotifyClient } from "./hooks/useSpotifyClient";

const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

export default function Home() {
  const { supabase, sdk } = useSpotifyClient();
  const [session, setSession] = useState<Session>(null);

  async function loginAndRedirect() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "spotify",
      options: {
        redirectTo: process.env.SUPABASE_REDIRECT,
        scopes: scopes.join(","),
      },
    });

    if (error) {
      console.error(error);
    }
  }

  if (sdk) {
    redirect("/search");
  }

  return (
    <div className={`${styles.homeWrapper}`}>
      <Image
        onClick={loginAndRedirect}
        className={`${styles.spotifyLogo}`}
        src={spotifyImage}
        alt="Spotify Image"
      />
    </div>
  );
}
