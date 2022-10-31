"use client"
import { useContext } from "react"
import toast from "react-hot-toast"
import sessionContext from "../../../contexts/sessionContext"
import Watchlist from "../../../icons/Watchlist"
import client from "../../../utils/tmdb"



export default function WatchlistAdd({ movieId }: { movieId: number }) {
    const { session } = useContext(sessionContext);
    return (
        <button className="btn h-auto w-auto" disabled={!session} onClick={async () => {
            client.setSessionId(session)
            const { watchlist: inWatchlist } = await client.movies.getAccountStates(movieId)
            toast.loading(`${inWatchlist ? "removing from" : "adding to"} watchlist`, { id: "watch" })
            const accountID = await (await client.account.getAccount()).id
            await client.account.addToWatchlist({ media_id: movieId, media_type: "movie", watchlist: !inWatchlist, accountID })
            toast.success(`${inWatchlist ? "removed from" : "added to"} watchlist`, { id: "watch" })
        }}>
            <Watchlist className="w-6 h-6" />
        </button>
    )
}