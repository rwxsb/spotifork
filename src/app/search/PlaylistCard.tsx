import Image from "next/image";
import styles from "./page.module.css";
import { Icon } from "@iconify/react";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useRouter } from "next/navigation";
import { useSpotifyClient } from "../hooks/useSpotifyClient";

interface PlaylistCardProps {
  userId: string;
  playListId: string;
  name: string;
  href: string;
  description: string;
  author: string;
}

export const PlaylistCard = (props: PlaylistCardProps) => {
  const router = useRouter();
  const { sdk } = useSpotifyClient();

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
          <h3 className={`${styles.playListTitle}`}>
            {props.name || props.description}
          </h3>
          {" by "}
          <p className={`${styles.playListAuthor}`}>{props.author}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.description }} />
      </div>
      <div className={`${styles.actionBar}`}>
        <Icon
          icon="fa:code-fork"
          onClick={(_) => forkPlaylist(props)}
          className={`${styles.actionBarItem}`}
        />
      </div>
      <div></div>
    </div>
  );
};
