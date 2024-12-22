"use client";
import { useState, useEffect, ChangeEventHandler, ChangeEvent } from "react";
import {
  UserProfile,
  PartialSearchResult,
  SpotifyApi,
  SimplifiedPlaylist,
  Playlist,
  AccessToken,
} from "@spotify/web-api-ts-sdk";
import { PlaylistCard } from "./PlaylistCard";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { createClient } from "@/utils/supabase/component";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useSpotifyClient } from "../hooks/useSpotifyClient";

export default function Playlists() {
  const { supabase, sdk, session, loading, error } = useSpotifyClient();
  const [profile, setProfile] = useState<UserProfile>();
  const [followed, setFollowed] = useState<SimplifiedPlaylist[]>(null);
  const [queryResult, setQueryResult] = useState<SimplifiedPlaylist[]>(null);

  console.log(session);

  if (sdk) {
    !followed &&
      sdk.currentUser.playlists
        .playlists()
        .then((res) => setFollowed(res.items));

    !profile && sdk.currentUser.profile().then((res) => setProfile(res));
  }

  const searchPlaylists = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value !== ""
      ? sdk
          .search(e.target.value, ["playlist"])
          .then((res) =>
            setQueryResult(res.playlists.items as SimplifiedPlaylist[]),
          )
      : setQueryResult(followed);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    redirect("/");
  }

  function getPageContent() {
    return (
      <div className={`${styles.searchContainer}`}>
        <div className={`${styles.topBar}`}>
          <button>{profile?.id}</button>
          <input
            className={`${styles.searchBar}`}
            onChange={searchPlaylists}
            type="text"
          />
        </div>
        {(queryResult ?? followed)
          ?.filter((item) => !!item)
          ?.map((item, index) => (
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
    );
  }

  return <div className={`${styles.pageWrapper}`}>{getPageContent()}</div>;
}
