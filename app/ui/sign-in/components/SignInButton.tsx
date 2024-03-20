"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react"

export default function SignInButton() {
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    )
  }

  if (loading) {
    return (
      <div
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        Loading...
      </div>
    )
  }

  return (
    <button
      onClick={() => { setLoading(true); signIn() }}
      className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
    >
      Sign In
    </button>
  )
} 