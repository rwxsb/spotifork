import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import styles from "./page.module.css";

interface PlaylistCardProps {
  name: string;
  href: string;
}

export const PlaylistCard = (props: PlaylistCardProps) => {
  return (
    <div className={`${styles.playListCard}`}>
      <Image src={props.href} alt="" width={100} height={100} />
      <div>{props.name}</div>
    </div>
  );
};
