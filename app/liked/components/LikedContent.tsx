"use client";

import { Song } from "@/types";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import MediaItem from "@/Components/MediaItem";
import LikeButton from "@/Components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}
const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  const router = useRouter();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
