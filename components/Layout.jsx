import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { userState } from "../context/atoms/user"
import { movieWatchlist } from "../context/atoms/watchlist"
import client from "../utils/tmdb"

export default function Layout({ children }) {
  const setWatchlist = useSetRecoilState(movieWatchlist)
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (localStorage.getItem("tmdb_token")) {
      setUser((old) => (
        {
          ...old,
          session_id: localStorage.getItem("tmdb_token")
        }
      ))
    }
  }, [setUser])

  useEffect(() => {
    if (user.session_id) {
      client.setSessionId(user.session_id)
    }
  }, [user])

  useEffect(() => {
    const setAccount = async () => {
      const { id } = await client.account.getAccount()
      setUser((old) => (
        { ...old, account_id: id }
      ))

    }
    if (user.session_id && !user.account_id) {
      setAccount()
    }
  }, [setUser, user])

  useEffect(() => {
    const getWatchlist = async () => {
      const data = await client.account.getMovieWatchlist({ accountID: user.account_id })
      setWatchlist(data.results.map((e) => e.id))
    }

    if (user.account_id && user.session_id) {
      getWatchlist()
    }
  }, [setWatchlist, user])

  return (
    <div className="w-full h-full" id="root">
      {children}
    </div>
  )
}