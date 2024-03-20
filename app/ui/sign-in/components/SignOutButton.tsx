"use client";

import Cookie from "js-cookie"
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut();
    Cookie.remove('traveler')
  }

  return (
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  )
}
