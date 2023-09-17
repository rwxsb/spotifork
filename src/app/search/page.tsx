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
  const sdk = useSpotify(clientId, redirectUrl, ["playlist-modify-public"]);
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  const [queryResult, setQueryResult] =
    useState<Pick<PartialSearchResult, "playlists">>();

  useEffect(() => {
    sdk?.currentUser.profile().then((res) => setProfile(res));
  }, [sdk?.currentUser]);

  async function logOut() {
    router.push("/");
    sdk?.logOut();
  }

  async function searchPlaylists(query: string) {
    if (query) {
      const playLists = await sdk?.search(query, ["playlist"]);
      setQueryResult(playLists);
    }
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
