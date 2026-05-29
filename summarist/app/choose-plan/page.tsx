"use client";
import { useState, useEffect, useRef } from "react";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import logo from "../../public/logo.png";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";

const MONTHLY_PRICE_ID = "price_1TbO1WF8uXnpvpgJK2VKDyD0";
const YEARLY_PRICE_ID = "price_1TbO1WF8uXnpvpgJ12x8kCCH";

const features = [
  "Access to 400+ summaries",
  "Listen to summaries on the go",
  "Cancel anytime",
  "New content added weekly",
];

const faqs = [
  {
    question: "How does the free trial work?",
    answer:
      "Begin your complimentary 7-day trial with the Summarist Annual Plan. If you don't cancel before the trial ends, you'll be charged the annual plan price. The trial is only available on the annual plan.",
  },
  {
    question: "Can I switch plans?",
    answer:
      "Yes, you can switch between the monthly and annual plans at any time. If you switch from annual to monthly, your annual benefits will remain until the end of the billing period.",
  },
  {
    question: "What happens after my trial ends?",
    answer:
      "After your 7-day free trial ends, you will be charged the annual subscription price. You can cancel at any time before the trial ends to avoid being charged.",
  },
  {
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time from your account settings. Your access will remain active until the end of your current billing period.",
  },
];

export default function ChoosePlan() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pendingCheckout = useRef(false);

  useEffect(() => {
    if (user && pendingCheckout.current) {
      handleSubscribe();
    }
  }, [user]);

  async function handleSubscribe() {
    if (!user) {
      pendingCheckout.current = true;
      dispatch(openModal('signup'));
      return;
    }
    pendingCheckout.current = false;

    setLoading(true);
    try {
      const docRef = await addDoc(
        collection(db, "customers", user.uid, "checkout_sessions"),
        {
          price: selectedPlan === "monthly" ? MONTHLY_PRICE_ID : YEARLY_PRICE_ID,
          trial_period_days: selectedPlan === "yearly" ? 7 : undefined,
          success_url: `${window.location.origin}/for-you`,
          cancel_url: `${window.location.origin}/choose-plan`,
        },
      );

      const unsub = onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (!data) return;
        if (data.error) {
          console.error(data.error.message);
          setLoading(false);
          unsub();
        }
        if (data.url) {
          unsub();
          window.location.assign(data.url);
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <figure className="max-w-screen flex justify-center">
        <Image
          src={logo}
          className="nav_img w-130 mb-10 h-full m-5"
          alt="logo"
          width={600}
          height={414}
        />
      </figure>

      <div className="bg-[#032b41] w-full flex flex-col items-center mb-16 pt-16 pb-10 px-4">
        <h1 className="text-white text-4xl font-bold mb-2 text-center max-w-2xl">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="text-[#6b8a9e] text-base text-center max-w-md">
          Turn ordinary moments into extraordinary learning opportunities with
          Summarist Premium
        </p>
      </div>

      <div className="flex flex-col items-center px-4">
        <div className="bg-[#1c3f52] rounded-xl p-6 mb-16 w-full max-w-xl">
          <h2 className="text-white text-2xl font-semibold mb-4">
            What you get with Premium:
          </h2>
          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f} className="flex tracking-wide text-xl items-center gap-3 text-[#bac8ce]">
                <IoCheckmarkSharp className="text-[#2bd97c] shrink-0" size={18} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between gap-8 w-full max-w-3xl mb-8">
          <button
            onClick={() => setSelectedPlan("yearly")}
            className={`relative rounded-xl p-4 border-2 w-80 text-left cursor-pointer transition-all ${
              selectedPlan === "yearly"
                ? "border-[#2bd97c] bg-[#1c3f52]"
                : "border-[#1c3f52] bg-[#1c3f52]/50"
            }`}
          >
            <span className="absolute -top-3 left-4 bg-[#2bd97c] text-[#032b41] text-xs font-bold px-2 py-0.5 rounded-full">
              7-day free trial
            </span>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Premium Plus Yearly</p>
                <p className="text-[#6b8a9e] text-sm">$99.99 / year</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === "yearly"
                    ? "border-[#2bd97c] bg-[#2bd97c]"
                    : "border-[#6b8a9e]"
                }`}
              >
                {selectedPlan === "yearly" && (
                  <IoCheckmarkSharp size={12} className="text-[#032b41]" />
                )}
              </div>
            </div>
            <p className="text-[#2bd97c] text-sm mt-1">Save over 16%</p>
          </button>

          <button
            onClick={() => setSelectedPlan("monthly")}
            className={`rounded-xl p-4 border-2 cursor-pointer w-80 text-left transition-all ${
              selectedPlan === "monthly"
                ? "border-[#2bd97c] bg-[#1c3f52]"
                : "border-[#1c3f52] bg-[#1c3f52]/50"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">Premium Monthly</p>
                <p className="text-[#6b8a9e] text-sm">$9.99 / month</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === "monthly"
                    ? "border-[#2bd97c] bg-[#2bd97c]"
                    : "border-[#6b8a9e]"
                }`}
              >
                {selectedPlan === "monthly" && (
                  <IoCheckmarkSharp size={12} className="text-[#032b41]" />
                )}
              </div>
            </div>
            <p className="text-[#2bd97c] text-sm mt-1"> No trial period</p>
          </button>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="bg-[#2bd97c] hover:bg-[#20c46e] disabled:opacity-60 text-[#032b41] font-bold cursor-pointer py-4 px-8 rounded-lg w-full max-w-md text-lg transition-colors"
        >
          {loading
            ? "Redirecting to checkout..."
            : selectedPlan === "yearly"
            ? "Start your 7-day free trial"
            : "Start your subscription"}
        </button>

        <p className="text-[#6b8a9e] text-xs mt-4 mb-16 text-center">
          {selectedPlan === "yearly"
            ? "After your 7-day free trial, you will be charged $99.99/year. Cancel anytime."
            : "Cancel anytime. Billed monthly."}
        </p>

        <div className="w-full max-w-xl mb-16">
          <h2 className="text-[#032b41] text-2xl font-bold mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-[#e1e7ea]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-4 text-left cursor-pointer"
                >
                  <span className="text-[#032b41] font-medium pr-4">{faq.question}</span>
                  <IoIosArrowDown
                    className={`text-[#032b41] shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
                {openFaq === i && (
                  <p className="text-[#6b8a9e] text-sm pb-4 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
