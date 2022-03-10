import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter()

  return (
    <header>
      <div className="navbar bg-base-100 mb-1 lg:mb-10 shadow-xl">
        <div className="navbar-start">
          <span className="btn btn-ghost normal-case text-xl"><Link href="/">RYM</Link></span>

        </div>
        <div className="navbar-end hidden lg:flex">
          <button className="btn btn-ghost btn-circle" onClick={() => router.push('/search')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
    </header>
  )
}