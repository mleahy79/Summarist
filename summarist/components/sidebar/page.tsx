"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { openModal } from "@/redux/slices/modalSlice";
import {
  FaMagnifyingGlass,
  FaHouse,
  FaBookmark,
  FaGear,
  FaHighlighter,
  FaCircleQuestion,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";

const topLinks =[
    {href: "/for-you", label: 'For you', icon: FaHouse },
    {href: "/library", label: 'My library', icon: FaBookmark},
    {href: "/highlights", label: 'Highlights', icon: FaHighlighter},
    {href: "/search", label: 'Search', icon: FaMagnifyingGlass },
]
const bottomLinks =[
    {href: '/settings', label: 'Settings', icon: FaGear },
    {href: "/support", label: 'Help & Support', icon: FaCircleQuestion },
    {href: "/login", label: 'Login', icon: FaArrowRightToBracket },
]



const SideBar = () => {
    const pathname = usePathname()
    const dispatch = useDispatch();

    if (pathname === "/" || pathname === "/home") return null;

  return (
    <aside className="hidden md:flex bg-[#f1f6f4] flex-col items-center gap-6 w-[200px] shrink-0 max-h-screen p-4 sticky top-0">
      <figure className="max-w-[200px]">
        <Image
          src={logo}
          className="nav_img w-full h-full"
          alt="logo"
          width={130}
          height={90}
        />
      </figure>
      <nav className="list-none flex flex-col flex-1 mt-4 gap-4">
        <ul>
            {topLinks.map(({href, label, icon: Icon}) =>(
                <li
                    key={href}
                    className={`flex  gap-4 py-4 p-9 justify-start font-normal text-[#032b41] border-l-4 focus:border-green-500 ${ pathname === href ? "border-l-green-400" : "border-transparent"}`}>
                    <Icon size={25} />
                    <Link href={href}>{label}</Link>
            </li>
            ))}
            </ul>
            <ul className="flex flex-col mt-auto">
            {bottomLinks.map(({href, label, icon: Icon}) =>(
                <li
                    key={href}
                    className={`flex  gap-4 py-4 p-9 justify-start font-normal text-[#032b41] border-l-4 focus:border-green-400 ${ pathname === href ? "border-l-green-400" : "border-transparent"}`}>
                    <Icon size={25} />
                    {href === "/login" ? (
                    <button onClick={() => dispatch(openModal())} className="cursor-pointer">{label}</button>
                    ) : (
                    <Link href={href}>{label}</Link>
                    )}
            </li>
            ) )}
        </ul>

      </nav>
    </aside>
  );
};

export default SideBar;
