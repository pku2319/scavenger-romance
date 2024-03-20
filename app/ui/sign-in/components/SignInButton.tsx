"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"

export default function SignInButton() {
  const [loading, setLoading] = useState(false)

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
      Let&apos;s Begin
    </button>
  )
} 