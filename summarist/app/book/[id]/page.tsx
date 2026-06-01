"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  AiOutlineAudio,
  AiOutlineClockCircle,
  AiOutlineBook,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Star } from "lucide-react";
import AudioDuration from "@/components/AudioDuration";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { useSubscription } from "@/hooks/useSubscription";

interface Book {
  id: string;
  type: string;
  title: string;
  tags: string[];
  author: string;
  keyIdeas: string;
  subTitle: string;
  audioLink: string;
  imageLink: string;
  totalRating: number;
  averageRating: number;
  bookDescription: string;
  authorDescription: string;
  subscriptionRequired: boolean;
}

export default function Book() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const { hasActiveSubscription } = useSubscription();
  const [book, setBook] = useState<Book | null>(null);
  const [savedToLibrary, setSavedToLibrary] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
      );
      const data = await res.json();
      setBook(data);
    };
    fetchBooks();
  }, [id]);

  if (!book) return <BookSkeleton />;

  function handleReadListen() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    if (book!.subscriptionRequired && !hasActiveSubscription) {
      router.push("/choose-plan");
      return;
    }
    router.push(`/player/${book!.id}`);
  }

  async function handleAddToLibrary() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    await setDoc(doc(db, "users", user.uid, "library", book!.id), {
      id: book!.id,
      title: book!.title,
      author: book!.author,
      imageLink: book!.imageLink,
      audioLink: book!.audioLink,
      subscriptionRequired: book!.subscriptionRequired,
    });
    setSavedToLibrary(true);
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col md:flex-row py-10 max-w-270 px-4">
        <div className="flex flex-col">
          <p className="text-[32px]  mb-2 font-bold ">{book.title}</p>
          <p className="text-base mb-3 font-bold">{book.author}</p>
          <p className="text-xl mb-3 pb-3 border-b border-gray-300 font-light ">
            {book.subTitle}
          </p>
          <div className="grid grid-cols-2 max-w-80">
            <p className="text-sm pt-1 pb-4 max-w-50 flex items-center font-bold">
              <Star size={20} className="mr-1" />
              {book.averageRating} ({book.totalRating} Ratings)
            </p>
            <p className="h-7 pl-10 text-sm font-bold items-center pt-2 flex">
              <AiOutlineClockCircle size={31} className="pr-1" />
              <AudioDuration src={book.audioLink} />
            </p>
            <>
              <p className="text-sm pb-3 flex max-w-50 font-bold">
                <AiOutlineAudio size={30} className="pr-1 pb-1" />
                {book.type}
              </p>
              <p className="text-sm pl-10 items-center pb-4 flex font-bold">
                <HiOutlineLightBulb size={30} className="pb-2" />
                {book.keyIdeas} Key ideas
              </p>
            </>
          </div>
          <div className="pt-6 flex justify-start gap-4 border-t w-full border-gray-300">
            <button
              onClick={handleReadListen}
              className="bg-[#032b41] text-white flex justify-center cursor-pointer items-center text-base font-normal rounded-sm py-2 px-9"
            >
              <AiOutlineBook size={25} className="text-white pr-2" /> Read
            </button>
            <button
              onClick={handleReadListen}
              className="bg-[#032b41] text-white text-base font-normal cursor-pointer flex items-center justify-center rounded-sm py-2 px-9"
            >
              <AiOutlineAudio size={25} className="text-white pr-2" />
              Listen
            </button>
          </div>
          <button onClick={handleAddToLibrary} className="pt-6 flex items-center cursor-pointer">
            <BsBookmark size={22} className="text-[#0265f2]" />
            <p className="text-[#0265f2] text-lg pl-2 pb-8 font-normal">
              {savedToLibrary ? "Saved to My Library" : "Add title to My Library"}
            </p>
          </button>
          <div>
            <p className="text-lg pb-3 font-bold">What's it about?</p>
            <div className="flex gap-4">
              {book.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-[#032b41] px-4 py-3 font-bold rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-base pt-4 text-[#032b41]">
              <p className="pb-4">{book.bookDescription}</p>
              <p className="pb-4 text-lg font-bold">About the author</p>
              <p className="pb-4">{book.authorDescription}</p>
            </div>
          </div>
        </div>
        <div className="shrink-0 w-full md:w-75 mb-6 md:mb-0 md:ml-8 order-first md:order-last">
          <img
            src={book.imageLink}
            alt={book.title}
            className="w-48 md:w-full h-auto mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

function BookSkeleton() {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="flex flex-col md:flex-row py-10 max-w-270 px-4">

        {/* Image — right on desktop, top on mobile */}
        <div className="w-48 md:w-75 shrink-0 mb-6 md:mb-0 md:ml-8 mx-auto md:mx-0 order-first md:order-last">
          <div className="w-full aspect-square bg-gray-200 rounded" />
        </div>

        {/* Text content */}
        <div className="flex flex-col mx-4 md:mx-0">
          <div className="h-8 w-80 bg-gray-200 rounded mb-2" />   {/* title */}
          <div className="h-4 w-48 bg-gray-200 rounded mb-3" />   {/* author */}
          <div className="h-5 w-96 bg-gray-200 rounded mb-3 pb-3 border-b border-gray-300" /> {/* subtitle */}

          {/* 2-col stats grid */}
          <div className="grid grid-cols-2 max-w-80 gap-y-3 mt-1 mb-4">
            <div className="h-4 w-36 bg-gray-200 rounded" />  {/* rating */}
            <div className="h-4 w-28 bg-gray-200 rounded pl-10" /> {/* duration */}
            <div className="h-4 w-28 bg-gray-200 rounded" />  {/* type */}
            <div className="h-4 w-24 bg-gray-200 rounded pl-10" /> {/* key ideas */}
          </div>

          {/* Read / Listen buttons */}
          <div className="pt-6 flex gap-4 border-t border-gray-300">
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>

          {/* Add to library */}
          <div className="pt-6 flex items-center gap-2 pb-8">
            <div className="h-4 w-4 bg-gray-200 rounded" />
            <div className="h-4 w-40 bg-gray-200 rounded" />
          </div>

          {/* What's it about */}
          <div className="h-5 w-32 bg-gray-200 rounded mb-3" />
          <div className="flex gap-4 mb-4">
            <div className="h-10 w-20 bg-gray-200 rounded" />  {/* tag */}
            <div className="h-10 w-20 bg-gray-200 rounded" />  {/* tag */}
          </div>

          {/* Book description lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          {/* About the author */}
          <div className="h-5 w-40 bg-gray-200 rounded mt-6 mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
        </div>


      </div>
    </div>
  );
}