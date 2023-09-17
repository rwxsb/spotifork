import Image from "next/image";
import styles from "./page.module.css";
import { useSpotify } from "../hooks/useSpotify";
import { Icon } from "@iconify/react";

interface PlaylistCardProps {
  userId: string;
  playListId: string;
  name: string;
  href: string;
  description: string;
  author: string;
}

const clientId = "7de5348da8994d779c49e165017c1083";
const redirectUrl = "http://localhost:3000/search";

export const PlaylistCard = (props: PlaylistCardProps) => {
  const sdk = useSpotify(clientId, redirectUrl, [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
  ]);

  async function forkPlaylist(props: PlaylistCardProps) {
    !sdk ?? console.error("sdk does not exists");
    const tracks = await sdk?.playlists.getPlaylistItems(props.playListId);
    const trackUris = tracks?.items.map((item) => item.track.uri);
    const createdPlaylist = await sdk?.playlists.createPlaylist(props.userId, {
      name: props.name + " | forked from " + props.author,
      description: props.description,
    });

    sdk?.playlists.addItemsToPlaylist(createdPlaylist?.id || "", trackUris);
  }

  return (
    <div className={`${styles.playListCard}`}>
      <div>
        <Image src={props.href} alt="" width={100} height={100} />
      </div>
      <div>
        <div>
          <h3 className={`${styles.playListTitle}`}>{props.name}</h3>
          {" by "}
          <p className={`${styles.playListAuthor}`}>{props.author}</p>
        </div>
        <div>{props.description}</div>
      </div>
      <Icon icon="fa:code-fork" onClick={() => forkPlaylist(props)} />
    </div>
  );
};
