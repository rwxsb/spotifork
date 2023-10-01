"use client";
import { useState, useEffect } from "react";
import {
  UserProfile,
  PartialSearchResult,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { PlaylistCard } from "./PlaylistCard";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { IAppState } from "../constants/state";
import { useRouter } from "next/navigation";
import { authUser } from "../state/actions/authActions";
import { useSpotify } from "../hooks/useSpotify";

const clientId = "7de5348da8994d779c49e165017c1083";

export default function Playlists() {
  const router = useRouter();
  const sdk = useSpotify();

  const [queryResult, setQueryResult] =
    useState<Pick<PartialSearchResult, "playlists">>();
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);

  useEffect(() => {
    if (sdk) {
      sdk.currentUser.profile().then((res) => setProfile(res));
    }
  }, [sdk]);

  async function logOut() {
    sdk?.logOut();
    localStorage.removeItem("code_verifier");
    router.push("/");
  }

  async function searchPlaylists(query: string) {
    if (query) {
      const playLists = await sdk?.search(query, ["playlist"]);
      setQueryResult(playLists);
    }
  }

  console.log(sdk);

  if (!sdk) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.pageWrapper}`}>
      <div className={`${styles.searchContainer}`}>
        <div className={`${styles.topBar}`}>
          <button onClick={logOut}>{profile?.id}</button>
          <input
            className={`${styles.searchBar}`}
            type="text"
            onChange={(e) => searchPlaylists(e.currentTarget.value)}
          />
          <Icon icon="mdi:logout" onClick={logOut} />
        </div>
        {queryResult?.playlists?.items.map((item, index) => (
          <PlaylistCard
            key={index}
            playListId={item.id}
            name={item.name}
            href={item.images[0].url}
            description={item.description}
            author={item.owner.display_name}
            userId={profile.id}
          />
        ))}
      </div>
    </div>
  );
}
