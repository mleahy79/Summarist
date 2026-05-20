"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaMicrophoneLines,
  FaClock,
  FaLightbulb,
  FaBookOpen,
  FaRegBookmark,
} from "react-icons/fa6";

interface Book {
  id: string;
  type: string;
  tags: string[];
  title: string;
  author: string;
  subTitle: string;
  keyIdeas: string;
  imageLink: string;
  totalRating: number;
  averageRating: number;
  bookDescription: string;
  authorDescription: string;
  subscriptionRequired: boolean;
}

export default function Book() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

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
  if (!book) return <div>loading...</div>;
  console.log(book.tags);

  return (
    <div className="flex justify-center">
      <div className="flex py-10 max-w-[1080px]  mr-6">
        <div className="flex flex-col mx-4 ">
          <p className="text-[32px]  mb-2 font-bold ">{book.title}</p>
          <p className="text-base mb-3 font-bold">{book.author}</p>
          <p className="text-xl mb-3 pb-3 border-b border-gray-300 font-light ">
            {book.subTitle}
          </p>
          <div className="grid grid-cols-2 max-w-80">
            <p className="text-sm pt-1 pb-4 max-w-50 flex items-center font-bold">
              <FaStar size={25} className="pr-1 pb-1" />
              {book.averageRating}({book.totalRating} Ratiings)
            </p>
            <p className="h-7 pl-10 pt-1 flex">
              <FaClock size={25} className="pr-1" />
            </p>
            <>
              <p className="text-sm pb-3 flex max-w-50 font-bold">
                <FaMicrophoneLines size={25} className="pr-1 pb-1" />
                {book.type}
              </p>
              <p className="text-sm pl-10 pb-4 flex font-bold">
                <FaLightbulb size={25} className="pb-2" />
                {book.keyIdeas} Key ideas
              </p>
            </>
          </div>
            <div className="pt-6 flex justify-start gap-4 border-t w-full border-gray-300">
              <Link href={`player/${book.id}`}>
              <button className="bg-[#032b41] text-white flex justify-center cursor-pointer items-center text-base font-normal rounded-sm py-2 px-9">
                <FaBookOpen size={30} className="text-white pr-2" /> Read
              </button>
              </Link>
              <Link href={`player/${book.id}`}>
              <button className="bg-[#032b41] text-white text-base font-normal cursor-pointer flex items-center justify-center rounded-sm py-2 px-9">
                <FaMicrophoneLines size={25} className="text-white pr-2" />
                Listen
              </button>
              </Link>
            </div>
          <div className="pt-6 flex">
            <FaRegBookmark size={22} className="text-[#0265f2] pt-1" />
            <p className="text-[#0265f2] text-lg pl-2 pb-8 font-normal">
              Add title to My Library
            </p>
          </div>
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
        <div>
          <img
            src={book.imageLink}
            alt={book.title}
            width={172}
            height={172}
          />
        </div>
      </div>
    </div>
  );
}
