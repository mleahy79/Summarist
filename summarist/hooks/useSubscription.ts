"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";

export type SubscriptionTier = "Basic" | "Premium" | "Premium Plus";

export interface Subscription {
  status: string;
  priceId: string;
  role: string;
  currentPeriodEnd: Date | null;
}

// Keep these in sync with choose-plan/page.tsx
const MONTHLY_PRICE_ID = "price_1TbO1WF8uXnpvpgJK2VKDyD0";
const YEARLY_PRICE_ID = "price_1TbO1WF8uXnpvpgJ12x8kCCH";

function deriveTier(priceId: string, role: string): SubscriptionTier {
  // Prefer the role written by the Stripe Firebase extension (requires
  // firebaseRole metadata on each Stripe product — set "premium" or "premiumplus")
  if (role) {
    const normalized = role.toLowerCase().replace(/[-_\s]/g, "");
    if (normalized === "premiumplus") return "Premium Plus";
    if (normalized === "premium") return "Premium";
  }
  // Fallback: match by price ID so it works without metadata configured
  if (priceId === YEARLY_PRICE_ID) return "Premium Plus";
  if (priceId === MONTHLY_PRICE_ID) return "Premium";
  return "Basic";
}

export function useSubscription() {
  const [user] = useAuthState(auth);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "customers", user.uid, "subscriptions"),
      where("status", "in", ["active", "trialing"])
    );

    const unsub = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setSubscription(null);
      } else {
        const doc = snapshot.docs[0].data();
        setSubscription({
          status: doc.status,
          priceId: doc.items?.[0]?.price?.id ?? doc.price?.id ?? "",
          role: doc.role ?? "",
          currentPeriodEnd: doc.current_period_end?.toDate?.() ?? null,
        });
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const tier = subscription
    ? deriveTier(subscription.priceId, subscription.role)
    : "Basic";

  return {
    subscription,
    loading,
    tier,
    isPremium: tier === "Premium",
    isPremiumPlus: tier === "Premium Plus",
    hasActiveSubscription: !!subscription,
  };
}
