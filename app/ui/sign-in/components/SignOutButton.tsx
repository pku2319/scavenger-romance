"use client";

import Cookie from "js-cookie"
import { signOut } from 'next-auth/react';

export default function SignOutButton({ className }: { className: string }) {
  const handleSignOut = () => {
    signOut();
    Cookie.remove('traveler')
  }

  return (
    <div className={className}>
      <button
        className="rounded-full bg-white/10 px-3 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  )
}
