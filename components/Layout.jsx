import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { userState } from "../context/atoms/user"
import { movieWatchlist } from "../context/atoms/movieWatchlist"
import client from "../utils/tmdb"
import { movieFavorite } from "../context/atoms/movieFavorite"

export default function Layout({ children }) {
  const setMovieWatchlist = useSetRecoilState(movieWatchlist)
  const setMovieFavorites = useSetRecoilState(movieFavorite)
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
      setMovieWatchlist(data.results.map((e) => e.id))
    }

    const getMovieFavorites = async () => {
      const data = await client.account.getFavoriteMovies({ accountID: user.account_id })
      setMovieFavorites(data.results.map((e) => e.id))
    }

    if (user.account_id && user.session_id) {
      getWatchlist()
      getMovieFavorites()
    }
  }, [setMovieWatchlist, user])

  return (
    <div className="w-full h-full" id="root">
      {children}
    </div>
  )
}