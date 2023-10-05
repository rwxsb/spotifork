import { Episode, Track } from "@spotify/web-api-ts-sdk";
import styles from "./page.module.css";

interface TrackItemProps {
  track: Track | Episode;
}

export default function TrackItem(props: TrackItemProps) {
  const { track } = props;
  return (
    <div className={`${styles.track}`}>
      <input type="checkbox" />
      <div>{track.name}</div>
    </div>
  );
}
