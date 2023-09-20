"use client";
import Image from "next/image";
import styles from "./page.module.css";
import spotifyImage from "./../../public/spotify.png";
import { useDispatch } from "react-redux";
import { authUser } from "./state/actions/authActions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  function loginAndRedirect() {
    dispatch(authUser({ clientId, redirectUrl, scopes }));
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
