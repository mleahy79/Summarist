"use client";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";

const Nav = () => {
    const dispatch = useDispatch();
  return (
    <div className="w-full h-20 ">
      <div className="flex items-center justify-between w-full h-full px-6 max-w-[1070px] mx-auto">
        <div className="flex gap-6 justify-between items-center w-full">
          <figure className="max-w-[200px]">
            <Image
              src={logo}
              className="nav_img w-full h-full"
              alt="logo"
              width={200}
              height={80}
            />
          </figure>
          <ul className="list-none flex gap-6 mt-2">
            <li  onClick={() => dispatch(openModal())} className="cursor-pointer text-[#032b41] hover:text-[#2bd97c] transition-colors duration-300">
              Login
            </li>

            <li className="cursor-not-allowed text-[#032b41]">About</li>
            <li className="cursor-not-allowed text-[#032b41]">Contact</li>
            <li className="cursor-not-allowed text-[#032b41]">Help</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
