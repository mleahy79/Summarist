"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { MdReplay10, MdForward10 } from "react-icons/md";

interface Book {
  id: string;
  title: string;
  author: string;
  summary: string;
  imageLink: string;
  audioLink: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PlayerPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      const data = await res.json();
      setBook(data);
    };
    fetchBook();
  }, [id]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  }

  if (!book) return <div>loading...</div>;

  return (
    <>
      <audio
        ref={audioRef}
        src={book.audioLink}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex justify-center whitespace-pre-line pb-28">
        <div className="max-w-200 p-6 flex flex-col justify-center">
          <p className="text-2xl text-[#032b41] py-6 font-bold">{book.title}</p>
          <div className="border-t border-gray-300 pt-6">
            <p className="text-base text-[#032b41]">{book.summary}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#042330] py-4 px-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pr-20 shrink-0">
            <Image src={book.imageLink} alt={book.title} width={48} height={48} className="rounded" />
            <div className="flex flex-col">
              <p className="text-sm text-white leading-tight">{book.title}</p>
              <p className="text-xs text-[#bac8ce]">{book.author}</p>
            </div>
          </div>

          <div className="flex items-center px-20 gap-4 mx-auto shrink-0">
            <button onClick={() => skip(-10)} className="text-white text-4xl hover:opacity-80 transition-opacity">
              <MdReplay10 />
            </button>
            <button
              onClick={togglePlay}
              className="bg-white text-[#042330] rounded-full w-12 h-12 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              {isPlaying
                ? <Pause size={22} fill="currentColor" strokeWidth={0} />
                : <Play size={22} fill="currentColor" strokeWidth={0} className="translate-x-0.5" />}
            </button>
            <button onClick={() => skip(10)} className="text-white text-4xl hover:opacity-80 transition-opacity">
              <MdForward10 />
            </button>
          </div>

          <div className="flex items-center gap-3 max-w-[480px] mr-10 pr-20 flex-1">
            <span className="text-white text-sm tabular-nums w-10 text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 accent-white h-1 cursor-pointer"
            />
            <span className="text-white text-sm tabular-nums w-10">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
