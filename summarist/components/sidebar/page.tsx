"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { openModal } from "@/redux/slices/modalSlice";
import {
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { RiBallPenLine } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const topLinks =[
    {href: "/for-you", label: 'For you', icon: AiOutlineHome },
    {href: "/library", label: 'My library', icon: BsBookmark},
    {href: "/highlights", label: 'Highlights', icon: RiBallPenLine},
    {href: "/search", label: 'Search', icon: AiOutlineSearch },
]
const bottomLinks =[
    {href: '/settings', label: 'Settings', icon: AiOutlineSetting },
    {href: "/support", label: 'Help & Support', icon: AiOutlineQuestionCircle },
]



const SideBar = () => {
    const pathname = usePathname()
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);

    if (pathname === "/" || pathname === "/home") return null;

  return (
    <aside className={`hidden md:flex fixed left-0 top-0 h-screen w-50 bg-[#f1f6f4] flex-col items-center gap-6 p-4 overflow-y-auto z-20${pathname.startsWith("/player") ? " pb-24" : ""}`}>
      <figure className="max-w-50">
        <Image
          src={logo}
          className="nav_img w-full h-full"
          alt="logo"
          width={130}
          height={90}
        />
      </figure>
      <nav className="list-none flex flex-col flex-1 w-full mt-4">
        <ul>
            {topLinks.map(({href, label, icon: Icon}) =>(
                <li
                    key={href}
                    className={`flex items-center gap-4 py-3 px-4 font-normal text-[#032b41] border-l-4 transition-colors cursor-pointer ${ pathname === href ? "border-l-green-400 bg-gray-200/60" : "border-transparent hover:bg-gray-200/40"}`}>
                    <Icon size={22} />
                    <Link href={href}>{label}</Link>
            </li>
            ))}
            </ul>
            <ul className="flex flex-col mt-auto">
            {bottomLinks.map(({href, label, icon: Icon}) =>(
                <li
                    key={href}
                    className={`flex items-center gap-4 py-3 px-4 font-normal text-[#032b41] border-l-4 transition-colors cursor-pointer ${ pathname === href ? "border-l-green-400 bg-gray-200/60" : "border-transparent hover:bg-gray-200/40"}`}>
                    <Icon size={22} />
                    <Link href={href}>{label}</Link>
            </li>
            ) )}
            <li className="flex items-center gap-4 py-3 px-4 font-normal text-[#032b41] border-l-4 border-transparent">
                {user ? <LuLogOut size={25} /> : <LuLogIn size={25} />}
                {user ? (
                    <button onClick={() => signOut(auth)} className="cursor-pointer">Logout</button>
                ) : (
                    <button onClick={() => dispatch(openModal())} className="cursor-pointer">Login</button>
                )}
            </li>
        </ul>

      </nav>
    </aside>
  );
};

export default SideBar;
