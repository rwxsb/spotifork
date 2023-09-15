"use client";
import Image from "next/image";
import styles from "./page.module.css";
import spotifyImage from "./../../public/spotify.png";
import { useRouter } from "next/navigation";

const clientId = "7de5348da8994d779c49e165017c1083";
const redirectUrl = "http://localhost:3000/search";

export default function Home() {
  //Remove routes and try to make it an SPA

  const router = useRouter();

  return (
    <div className={`${styles.homeWrapper}`}>
      <Image
        onClick={() => router.push("/search")}
        className={`${styles.spotifyLogo}`}
        src={spotifyImage}
        alt="Spotify Image"
      />
    </div>
  );
}
