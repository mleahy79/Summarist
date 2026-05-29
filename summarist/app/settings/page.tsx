"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useSubscription, SubscriptionTier } from "@/hooks/useSubscription";

const TIER_STYLES: Record<
  SubscriptionTier,
  { badge: string; description: string }
> = {
  Basic: {
    badge: "bg-gray-100 text-gray-600 border border-gray-200",
    description: "Access to free books and summaries.",
  },
  Premium: {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    description: "Unlimited access to all book summaries.",
  },
  "Premium Plus": {
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    description: "Unlimited access + audio player for all books.",
  },
};

export default function SettingsPage() {
  const [user] = useAuthState(auth);
  const { tier, subscription, loading } = useSubscription();
  const styles = TIER_STYLES[tier];

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#032b41]">Settings</h1>
          <p className="text-[#6b7280] mt-1 text-sm">
            Manage your account and subscription
          </p>
        </div>

        {loading ? (
          <SettingsSkeleton />
        ) : (
          <div className="space-y-4">
            {/* Account Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                  Account
                </span>
              </div>

              <div className="px-6 py-5 flex items-center gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-[#2bd97c] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {user?.email?.[0]?.toUpperCase() ?? "?"}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-[#6b7280] mb-0.5">
                    Email address
                  </p>
                  <p className="text-[#032b41] font-medium text-sm">
                    {user?.email ?? "Not signed in"}
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50">
                <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider">
                  Subscription
                </span>
              </div>

              <div className="px-6 py-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[#6b7280] mb-2">Current plan</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}
                      >
                        {tier}
                      </span>
                      {subscription?.status === "trialing" && (
                        <span className="text-xs text-purple-600 font-medium bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
                          Trial
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6b7280] mt-2">
                      {styles.description}
                    </p>
                  </div>

                  {tier === "Basic" && (
                    <a
                      href="/choose-plan"
                      className="text-sm font-semibold text-[#2bd97c] hover:text-[#20c06a] transition-colors whitespace-nowrap"
                    >
                      Upgrade →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <div className="h-3 w-16 bg-gray-100 rounded" />
        </div>
        <div className="px-6 py-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-100" />
          <div className="space-y-2">
            <div className="h-2.5 w-20 bg-gray-100 rounded" />
            <div className="h-3.5 w-44 bg-gray-100 rounded" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
        <div className="px-6 py-5 space-y-3">
          <div className="h-2.5 w-20 bg-gray-100 rounded" />
          <div className="h-7 w-28 bg-gray-100 rounded-full" />
          <div className="h-2.5 w-56 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
