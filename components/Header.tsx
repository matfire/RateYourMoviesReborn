"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import sessionContext from "../contexts/sessionContext";
import User from "../icons/User";
import client from "../utils/tmdb";

export default function Header() {
  const { session } = useContext(sessionContext);
  const router = useRouter()

  return (
    <header>
      <div className="navbar bg-base-100 mb-1 lg:mb-10 shadow-xl">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost normal-case text-xl">RYM</Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <Link className="btn btn-ghost btn-circle" aria-label="search" href="/search">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </Link>
          {!session &&
            <button aria-label="sign in" className="btn btn-ghost btn-circle" onClick={async () => {
              const url = await client.auth.createAuthUrl(`${process.env.NODE_ENV === "production" ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}` : "http://localhost:3000"}/authentication/success`)
              window.location.replace(url);
            }}>
              <User className="h-5 w-5" />
            </button>}
        </div>
      </div>
    </header>
  )
}