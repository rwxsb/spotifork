"use client";
import { useState } from "react";
import { useSpotify } from "./../hooks/useSpotify";
import {
  UserProfile,
  ItemTypes,
  PartialSearchResult,
} from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { PlaylistCard } from "./PlaylistCard";

const clientId = "7de5348da8994d779c49e165017c1083";
const redirectUrl = "http://localhost:3000/search";

export default function Playlists() {
  const router = useRouter();
  const sdk = useSpotify(clientId, redirectUrl);
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  const [queryResult, setQueryResult] =
    useState<Pick<PartialSearchResult, "playlists">>();
  async function logOut() {
    router.push("/");
    sdk?.logOut();
  }
  sdk?.currentUser.profile().then((res) => {
    setProfile(res);
  });

  async function searchPlaylists(query: string) {
    const playLists = await sdk?.search(query, ["playlist"]);
    console.log(playLists);
    setQueryResult(playLists);
  }

  return (
    <div>
      <button onClick={logOut}>{profile?.id}</button>
      <input
        type="text"
        onChange={(e) => searchPlaylists(e.currentTarget.value)}
      />
      {queryResult?.playlists?.items.map((item, index) => (
        <PlaylistCard key={index} name={item.name} href={item.images[0].url} />
      ))}
    </div>
  );
}