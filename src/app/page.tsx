"use client";
import Image from "next/image";
import styles from "./page.module.css";
import spotifyImage from "./../../public/spotify.png";
import { useRouter } from "next/navigation";

export default function Home() {
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
