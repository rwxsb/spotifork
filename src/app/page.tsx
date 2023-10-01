"use client";
import Image from "next/image";
import styles from "./page.module.css";
import spotifyImage from "./../../public/spotify.png";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./state/actions/authActions";
import { redirect, useRouter } from "next/navigation";
import { IAppState } from "./constants/state";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const clientId = "7de5348da8994d779c49e165017c1083";
const redirectUrl = "http://localhost:3000/search";
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public",
];

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state: IAppState) => state.token.token);

  function loginAndRedirect() {
    console.log(JSON.stringify(token));
    if (token) {
      redirect("/search");
    } else {
      dispatch(authUser({ clientId, redirectUrl, scopes }));
    }
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
