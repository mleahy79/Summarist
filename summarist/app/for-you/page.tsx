"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiOutlineStar,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { Play } from "lucide-react";
import AudioDuration from "@/components/AudioDuration";

interface Book {
  id: string;
  title: string;
  author: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  averageRating: number;
  subscriptionRequired: boolean;
}

export default function ForYou() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [suggested, setSuggested] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);




useEffect(() => {
  const fetchBooks = async () => {
    const [sel, rec, sug] = await Promise.all([
      fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
      ).then((r) => r.json()),
      fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
      ).then((r) => r.json()),
      fetch(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
      ).then((r) => r.json()),
    ]);
    console.log("selected:", sel);
    console.log("recommended:", rec);
    console.log("suggested:", sug);
    setSelected(sel[0]);
    setRecommended(rec);
    setSuggested(sug);
    setLoading(false);
  };
  fetchBooks();
}, []);

if (loading) return <ForYouSkeleton />;
return (
  <>
      <div className="max-w-[1020px] mx-auto pt-10">
        <h1 className="text-[22px] font-bold mb-4">Selected just for you</h1>

        <div className="h-46 bg-[#fbefd6] flex w-2/3 p-4">
          <div className="flex flex-1">
            <p className="text-base max-w-55 text-[#032b41]">
              {selected?.subTitle}
            </p>
          </div>
          <div className="w-px bg-gray-300"></div>
          <div className="flex items-end ml-2 p-2 w-38">
            <img src={selected?.imageLink} alt={selected?.title} />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="font-bold text-lg">{selected?.title}</h3>
            <p className="text-gray-500 text-sm">{selected?.author}</p>
            <div className="flex items-center gap-2">
              <Link href={`/player/${selected?.id}`}>
                <button className="text-white bg-[#042330] rounded-full w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Play size={22} fill="currentColor" strokeWidth={0} className="translate-x-0.5 pr-0.5" />
                </button>
              </Link>
              {selected?.audioLink && <AudioDuration src={selected.audioLink} />}
            </div>
          </div>
        </div>

        <h3 className="text-[22px] font-bold mb-4 mt-6">Recommended For You</h3>
        <p className="text-base font-extralight mb-8">
          We think you&apos;ll like these
        </p>

        <div className="flex gap-8 mt-6 overflow-x-auto snap-x snap-mandatory">
          {recommended.map((book) => (
            <Link href={`/book/${book.id}`} key={book.id}>
              <div className="snap-start cursor-pointer shrink-0 w-43">
                {book.subscriptionRequired ? (
                  <span
                  className="bg-[#032b41]
                  text-white text-xs w-auto h-auto py-0.5 px-2 float-right mb-3 rounded-full"
                  >
                    Premium
                  </span>
                ) : (
                  <div className="h-8.5"></div>
                )}

                <img
                  src={book.imageLink}
                  alt={book.title}
                  width={172}
                  height={172}
                />
                <p className="font-bold">{book.title}</p>
                <p className="text-sm font-extralight">{book.author}</p>
                <p className="text-sm">{book.subTitle}</p>
                <div className="flex gap-2 pt-2">
                <p className="flex items-center gap-1 text-sm font-light"><AiOutlineClockCircle size={15}/> <AudioDuration src={book.audioLink} /></p>
                <p className="text-sm font-light flex"><AiOutlineStar size={15} className="text-[#032b41] mx-1" />{book.averageRating}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h3 className="text-[22px] font-bold mb-4 mt-6">Suggested Books</h3>
        <p className="text-base font-light mb-8">Browse those books</p>

        <div className="flex gap-8 mt-6 overflow-x-auto snap-x snap-mandatory">
          {suggested.map((book) => (
            <Link href={`/book/${book.id}`} key={book.id}>
              <div className="snap-start cursor-pointer shrink-0 w-43">
                {book.subscriptionRequired ? (
                  <span
                  className="bg-[#032b41]
                  text-white text-xs w-auto h-auto py-0.5 px-2 float-right mb-3 rounded-full"
                  >
                    Premium
                  </span>
                ) : (
                  <div className="h-8.5"></div>
                )}

                <img
                  src={book.imageLink}
                  alt={book.title}
                  width={172}
                  height={172}
                />
                <p className="font-bold">{book.title}</p>
                <p className="text-sm font-extralight">{book.author}</p>
                <p className="text-sm">{book.subTitle}</p>
                  <div className="flex gap-2 pt-2">
                <p className="flex items-center gap-1 text-sm font-light"><AiOutlineClockCircle size={15}/> <AudioDuration src={book.audioLink} /></p>
                <p className="text-sm font-light flex"><AiOutlineStar size={15} className="text-[#032b41] mx-1" />{book.averageRating}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

function ForYouSkeleton() {
  return (
    <div className="max-w-[1020px] mx-auto pt-10 animate-pulse">

      {/* "Selected just for you" banner */}
      <div className="h-5 w-48 bg-gray-200 rounded mb-4" /> {/* heading */}
      <div className="h-46 bg-gray-200 w-2/3 rounded" />

      {/* "Recommended For You" heading + subtext */}
      <div className="h-5 w-56 bg-gray-200 rounded mt-6 mb-2" />
      <div className="h-4 w-40 bg-gray-200 rounded mb-8" />

      {/* Recommended book cards */}
      <div className="flex gap-8 mt-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>

      {/* "Suggested Books" heading + subtext */}
      <div className="h-5 w-44 bg-gray-200 rounded mt-6 mb-2" />
      <div className="h-4 w-32 bg-gray-200 rounded mb-8" />

      {/* Suggested book cards */}
      <div className="flex gap-8 mt-6 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>

    </div>
  );
}

function BookCardSkeleton() {
  return (
    <div className="shrink-0 w-43">
      <div className="h-8.5" /> {/* premium badge placeholder */}
      <div className="w-[172px] h-[172px] bg-gray-200 rounded" /> {/* image */}
      <div className="h-4 w-36 bg-gray-200 rounded mt-2" />   {/* title */}
      <div className="h-3 w-24 bg-gray-200 rounded mt-1" />   {/* author */}
      <div className="h-3 w-32 bg-gray-200 rounded mt-1" />   {/* subtitle */}
      <div className="flex gap-2 pt-2">
        <div className="h-3 w-14 bg-gray-200 rounded" />       {/* duration */}
        <div className="h-3 w-10 bg-gray-200 rounded" />       {/* rating */}
      </div>
    </div>
  );
}