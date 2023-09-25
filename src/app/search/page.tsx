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

const clientId = "7de5348da8994d779c49e165017c1083";

export default function Playlists() {
  const tokenState = useSelector((state: IAppState) => state.token);
  const sdk = SpotifyApi.withAccessToken(clientId, tokenState.token);

  const [queryResult, setQueryResult] =
    useState<Pick<PartialSearchResult, "playlists">>();
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);

  useEffect(() => {
    sdk.currentUser.profile().then((res) => setProfile(res));
  }, []);

  async function logOut() {
    sdk?.logOut();
  }

  async function searchPlaylists(query: string) {
    if (query) {
      const playLists = await sdk?.search(query, ["playlist"]);
      setQueryResult(playLists);
    }
  }

  // if (authState.token) {
  //   return <div>Loading...</div>;
  // }

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
