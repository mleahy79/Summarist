"use client";

import { useRef, useState } from "react";
import { formatTime } from "@/lib/formatTime";

export default function AudioDuration({ src }: { src: string }) {
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
      />
      <span>{formatTime(duration)}</span>
    </>
  );
}
