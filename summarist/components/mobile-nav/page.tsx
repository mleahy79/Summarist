"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSearch, AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";

const links = [
  { href: "/for-you", label: "Home", icon: AiOutlineHome },
  { href: "/library", label: "Library", icon: BsBookmark },
  { href: "/highlights", label: "Highlights", icon: RiBallPenLine },
  { href: "/search", label: "Search", icon: AiOutlineSearch },
  { href: "/settings", label: "Settings", icon: AiOutlineSetting },
];

export default function MobileNav() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/home" || pathname.startsWith("/player")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f1f6f4] border-t border-gray-200 z-40">
      <ul className="flex justify-around py-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className="flex flex-col items-center gap-0.5 px-2 py-1"
              >
                <Icon size={22} className={active ? "text-green-500" : "text-[#032b41]"} />
                <span className={`text-xs ${active ? "text-green-500" : "text-[#032b41]"}`}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
