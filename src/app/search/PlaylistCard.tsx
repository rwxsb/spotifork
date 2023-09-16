import Image from "next/image";
import styles from "./page.module.css";
import forkSvg from "./../../../public/git-fork.svg";
import { useSpotify } from "../hooks/useSpotify";

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
    console.log(props);
    !sdk ?? console.error("sdk does not exists");
    const tracks = await sdk?.playlists.getPlaylistItems(props.playListId);
    const trackUris = tracks?.items.map((item) => item.track.uri);
    const createdPlaylist = await sdk?.playlists.createPlaylist(props.userId, {
      name: props.name,
      description: props.description,
    });

    sdk?.playlists.addItemsToPlaylist(createdPlaylist?.id || "", trackUris);
  }

  return (
    <div className={`${styles.playListCard}`}>
      <Image src={props.href} alt="" width={100} height={100} />
      <div>
        <div>{props.name}</div>
        <div>{props.description}</div>
        <div>{props.author}</div>
      </div>
      <Image
        src={forkSvg}
        className={`${styles.forkButton}`}
        onClick={() => forkPlaylist(props)}
        alt="fork button"
      />
    </div>
  );
};
