import { PlaylistBase } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

interface PlaylistCardProps {
  name: string;
  href: String;
}

export const PlaylistCard = (props: PlaylistBase) => {
  return (
    <div>
      <Image src={props.href} alt="" width={100} height={100} />
      <div>{props.name}</div>
    </div>
  );
};
