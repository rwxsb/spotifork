"use client";
import { useEffect, useState } from "react";
import { useSpotify } from "./../hooks/useSpotify";
import { UserProfile, PartialSearchResult } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { PlaylistCard } from "./PlaylistCard";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";

const clientId = "7de5348da8994d779c49e165017c1083";
const redirectUrl = "http://localhost:3000/search";

export default function Playlists() {
  const router = useRouter();
  //To distribute the sdk we should use Redux or Other Context API
  const sdk = useSpotify(clientId, redirectUrl, [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
  ]);
  const [queryResult, setQueryResult] =
    useState<Pick<PartialSearchResult, "playlists">>();
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);

  async function logOut() {
    router.push("/");
    sdk?.logOut();
  }

  useEffect(() => {
    async function getCurrentUser() {
      console.log(sdk);
      const currentUser =
        (await sdk?.currentUser.profile()) || ({} as UserProfile);
      setProfile(currentUser);
    }

    if (sdk) {
      getCurrentUser();
    } else {
      console.error("SDK is not initialized");
    }
  }, [sdk]);

  async function searchPlaylists(query: string) {
    if (query) {
      const playLists = await sdk?.search(query, ["playlist"]);
      setQueryResult(playLists);
    }
  }

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
