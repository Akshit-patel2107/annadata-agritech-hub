import { useEffect, useState } from "react";

export type Role = "Farmer" | "Buyer" | "Business";

export type Profile = {
  name: string;
  phone: string;
  village: string;
  state: string;
  role: Role;
  createdAt: string;
};

const KEY = "anndata.profile.v1";

export function loadProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(p: Profile) {
  window.localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event("anndata:profile-change"));
}

export function clearProfile() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("anndata:profile-change"));
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
    const handler = () => setProfile(loadProfile());
    window.addEventListener("anndata:profile-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("anndata:profile-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { profile, ready };
}
