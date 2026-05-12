"use client";
import Image from "next/image";
import {
  FaFileAlt,
  FaLightbulb,
  FaMicrophone,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import HighlightCycle from "@/components/HighlightCycle";
import { useState, useEffect } from "react";
import { Crown, Leaf } from "lucide-react";
import { GiQueenCrown } from "react-icons/gi";

const cycleList1 = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself",
];

const cycleList2 = [
  "Expand your learning",
  "Accomplish your vitality",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cycleList1.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex justify-evenly mt-10 px-[95.5px]">
        <div className="flex flex-col items-start gap-6 max-w-[440px] mx-6">
          <h1 className="text-4xl font-black text-gray-800">
            Gain more knowledge <br className="hidden md:block" />
            in less time
          </h1>

          <p className="text-gray-600 text-2xl">
            Great summaries for busy people, <br className="hidden md:block" />
            individuals who barely have time to read,{" "}
            <br className="hidden md:block" />
            and even people who don&apos;t like to read.
          </p>

          <button className="bg-[#2bd97c] text-[#032b42] w-full h-11 rounded font-medium flex items-center justify-center">
            Login
          </button>
        </div>

        <figure className="max-w-[740px]">
          <Image
            src="/landing.png"
            alt="Placeholder"
            width={400}
            height={416}
          />
        </figure>
      </div>
      <div className="mx-[99px] p-[24px]">
        <div className="w-full flex flex-col items-center mb-10 mt-15">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Understand books in a few minutes
          </h2>
          <div className="flex justify-center gap-8 mt-12">
            <div className="flex flex-col items-center gap-4 min-w-[314px] max-w-[200px] text-center">
              <FaFileAlt size={60} className="text-[#032b42]" />
              <h3 className="font-medium text-2xl text-[#032b42]">
                Read or listen
              </h3>
              <p className="text-gray-600 font-light text-lg">
                Save time by getting the core ideas from the best books.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 max-w-[200px] min-w-[314px] text-center">
              <FaLightbulb size={60} className="text-[#032b42]" />
              <h3 className="font-medium text-2xl text-[#032b42]">
                Find your next read
              </h3>
              <p className="text-gray-600 font-light text-lg">
                Explore book lists and personalized recommendations.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 max-w-[200px] min-w-[314px] text-center">
              <FaMicrophone size={60} className="text-[#032b42]" />
              <h3 className="font-medium text-2xl text-[#032b42]">
                Briefcasts
              </h3>
              <p className="text-gray-600 font-light text-lg">
                Gain valuable insights from briefcasts
              </p>
            </div>
          </div>
          <div className="max-w-[1070px] w-full mt-20">
            <div className="grid-cols-2 mt-5 gap-10 w-full hidden md:grid">
              <HighlightCycle items={cycleList1} activeIndex={activeIndex} />
              <div className="bg-[#f1f6f4] rounded-sm py-[40px] px-[24px] w-full flex flex-col gap-8">
                <div className="flex items-start pl-8">
                  <span className="font-bold text-[20px] text-blue-600 min-w-[50px]">
                    93%
                  </span>
                  <p className="text-gray-700 font-light text-[20px] ">
                    of Summarist members{" "}
                    <strong className="font-medium">
                      significantly increase
                    </strong>{" "}
                    reading frequency.
                  </p>
                </div>
                <div className="flex items-start pl-8">
                  <span className="font-bold text-[20px] text-blue-600 min-w-[50px]">
                    96%
                  </span>
                  <p className="text-gray-700 font-light text-[20px]">
                    of Summarist members{" "}
                    <strong className="font-medium">establish better</strong>{" "}
                    habits.
                  </p>
                </div>
                <div className="flex items-start pl-8">
                  <span className="font-bold text-[20px] text-blue-600 min-w-[50px]">
                    90%
                  </span>
                  <p className="text-gray-700 font-light text-[20px]">
                    have made{" "}
                    <strong className="font-medium">
                      significant positive
                    </strong>{" "}
                    change to their lives.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid-cols-2 mt-20 mb-4 gap-10 w-full hidden md:grid">
              <div className="bg-[#f1f6f4] rounded-sm py-[40px] px-[24px] w-full flex flex-col">
                <div className="flex items-start ">
                  <span className="font-bold text-[20px] text-blue-600 min-w-[50px]">
                    91%
                  </span>
                  <p className="text-gray-700 font-light text-[20px] ">
                    of Summarist members{" "}
                    <strong className="font-medium">
                      report feeling more productive
                    </strong>{" "}
                    after incorporating the service into their daily routine.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="font-bold text-[20px] text-blue-600 min-w-[50px]">
                    94%
                  </span>
                  <p className="text-gray-700 font-light text-[20px]">
                    of Summarist members have{" "}
                    <strong className="font-medium">
                      noticed an improvement{" "}
                    </strong>
                    in their overall comprehension and retention of information.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="font-bold text-[20px] text-blue-600 min-w-[50px]">
                    88%
                  </span>
                  <p className="text-gray-700 font-light text-[20px]">
                    of Summarist members{" "}
                    <strong className="font-medium">feel more informed </strong>
                    about current events and industry trends since using the
                    platform.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end">
                <HighlightCycle items={cycleList2} activeIndex={activeIndex} />
              </div>
            </div>
          </div>
          <div className="max-w-[600px] w-full mt-20 mb-20">
            <h2 className="text-[32px] mb-7 font-bold text-center">
              What our members say
            </h2>

            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm">
              <p className="font-light text-[#032b41] flex gap-2 mb-2">
                Hanna.M
                <div className="flex items-center ">
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                </div>
              </p>
              <p className="text-[#3994547] leading-snug font-light text-base">
                This app has been a{" "}
                <strong className="font-normal">game-changer</strong> for me!
                It's saved me so much time and effort in reading and
                comprehending books. Highly recommend it to all book lovers.
              </p>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm">
              <p className="font-light text-[#032b41] flex gap-2 mb-2">
                David B.
                <div className="flex items-center ">
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                </div>
              </p>
              <p className="text-[#3994547] leading-snug font-light text-base">
                I love this app! It provides concise and{" "}
                <strong className="font-normal">accurate summaries</strong> of
                books in a way that is easy to understand. It's also very
                user-friendly and intuitive.
              </p>
            </div>
            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm">
              <p className="font-light text-[#032b41] flex gap-2 mb-2">
                Nathan S.
                <div className="flex items-center ">
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                </div>
              </p>
              <p className="text-[#3994547] leading-snug font-light text-base">
                This app is a great way to get the main takeaways from a book
                without having to read the entire thing.{" "}
                <strong className="font-normal">
                  The summaries are well-written and informative.
                </strong>{" "}
                Definitely worth downloading.
              </p>
            </div>

            <div className="bg-[#fff3d7] p-4 mb-8 rounded-sm">
              <p className="font-light text-[#032b41] flex gap-2 mb-2">
                Ryan R.
                <div className="flex items-center ">
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                  <FaStar size={16} className="text-blue-600" />
                </div>
              </p>
              <p className="text-[#3994547] font-light text-base leading-[1.4] ">
                If you're a busy person who{" "}
                <strong className="font-normal">
                  loves reading but doesn't have the time
                </strong>{" "}
                to read every book in full, this app is for you! The summaries
                are thorough and provide a great overview of the book's content.
              </p>
            </div>
            <div className=" flex justify-center">
              <button
                className="bg-[#2bd97c] text-[#032b42]  min-w-[300px] h-11 rounded 
              font-medium flex items-center justify-center"
              >
                Login
              </button>
            </div>
          </div>
          <div className="max-w-[1070px] w-full mt-5 mb-20">
            <h2 className="text-[32px] mb-7 font-bold text-center">
              Start growing with Summarist now
            </h2>
            <div className="grid-cols-3 gap-10 w-full hidden md:grid">
              <div className="bg-[#d7e9ff] rounded-xl py-6 pt-6 pb-10 px-6 w-full items-center flex flex-col gap-4">
                <GiQueenCrown size={40} className="text-blue-600" />
                <h3 className="font-semibold text-4xl text-[#032b42]">
                  3 Milllion
                </h3>
                <p className="text-gray-700 font-light text-center text-base">
                  Download on all platforms
                </p>
              </div>
              <div className="bg-[#d7e9ff] rounded-xl py-6 pt-6 pb-10 px-6 w-full items-center flex flex-col gap-4">
                <div className="flex items-center pt-5 gap-2">
                  <FaStar size={20} className="text-blue-700" />
                  <FaStar size={20} className="text-blue-700" />
                  <FaStar size={20} className="text-blue-700" />
                  <FaStar size={20} className="text-blue-700" />
                  <FaStarHalfAlt size={20} className="text-blue-700" />
                </div>
                <h3 className="font-semibold text-4xl text-[#032b42]">
                  4.5 Stars
                </h3>
                <p className="text-gray-700 font-light text-center text-base">
                  Average rating on IOS and Google Play
                </p>
              </div>
              <div className="bg-[#d7e9ff] rounded-xl py-6 pt-6 pb-10 px-6 w-full items-center flex flex-col gap-4">
                <Leaf size={40} className="text-blue-600" />
                <h3 className="font-semibold text-4xl text-[#032b42]">97%</h3>
                <p className="text-gray-700 font-light text-center text-base">
                  Of Summarists members create a better reading habit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
