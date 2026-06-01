"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
}

export default function Search() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  if (pathname === "/" || pathname === "/home") return null;

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!value) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${value}`,
      );
      const data = await res.json();
      setResults(data);
    }, 300);
  };

  return (
    <div className="hidden md:flex h-19.75 w-auto md:px-10 md:mx-9 border-b border-gray-200">
      <div className="flex h-full w-full max-w-[1200px] justify-end">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
        
            placeholder="Search for books"
            className="px-4 py-2 text-sm border border-gray-300 bg-[#f1f6f4] w-85 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          {results.length > 0 && (
            <div className="absolute top-12 right-0 bg-white border mt-12 border-gray-200 rounded-lg shadow-xl w-102 max-h-160 z-50">
              {results.map((book: Book) => (
                <Link
                  key={book.id}
                  href={`/book/${book.id}`}
                  onClick={handleClear}
                  className="flex items-center gap-3 p-2 border-b border-gray-200 p-4 hover:bg-gray-50"
                >
                  <img
                    src={book.imageLink}
                    alt={book.title}
                    className="w-20 h-20 m-2 object-cover"
                  />
                  <div>
                    <p className="text-base pb-1.5 font-bold">{book.title}</p>
                    <p className="text-sm pb-1.5 font-light text-gray-500">{book.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="absolute right-3 flex items-center justify-center">

          {query ? (
           <button onClick={handleClear} aria-label="Clear Search"><AiOutlineClose size={20} className="text-[#032b41] text-center" /></button> ):(
          <AiOutlineSearch
            size={20}
            className="text-[#032b41]"
            />
              )}
            </div>
        </div>
      </div>
    </div>
  );
}
