import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { IAppState } from "../constants/state";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSpotify } from "../hooks/useSpotify";
import { useRouter } from "next/navigation";

interface PlaylistCardProps {
  userId: string;
  playListId: string;
  name: string;
  href: string;
  description: string;
  author: string;
}

const clientId = "7de5348da8994d779c49e165017c1083";

export const PlaylistCard = (props: PlaylistCardProps) => {
  const router = useRouter();
  const sdk = useSpotify();

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
      <div className={`${styles.centerColumn}`}>
        <div>
          <h3 className={`${styles.playListTitle}`}>{props.name}</h3>
          {" by "}
          <p className={`${styles.playListAuthor}`}>{props.author}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.description }} />
      </div>
      <div className={`${styles.actionBar}`}>
        <Icon
          icon="fa:code-fork"
          onClick={() => forkPlaylist(props)}
          className={`${styles.actionBarItem}`}
        />
        <Icon
          onClick={() => router.push(`/${props.playListId}`)}
          icon="ep:arrow-right"
          height={"70px"}
          className={`${styles.actionBarItem}`}
        />
      </div>
      <div></div>
    </div>
  );
};
