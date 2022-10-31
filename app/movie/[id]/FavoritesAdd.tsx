"use client"
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import sessionContext from "../../../contexts/sessionContext"
import Heart from "../../../icons/Heart"
import client from "../../../utils/tmdb"
export default function FavoritesAdd({ movieId }: { movieId: number }) {
    const { session } = useContext(sessionContext);

    return (
        <button className="btn h-auto w-auto" disabled={!session} onClick={async () => {
            client.setSessionId(session)
            const { favorite: inFavorites } = await client.movies.getAccountStates(movieId);
            toast.loading(`${inFavorites ? "removing" : "adding"} to favorites`, { id: "fav" })
            const accountID = await (await client.account.getAccount()).id
            await client.account.markAsFavorite({ media_id: movieId, media_type: "movie", favorite: !inFavorites, accountID })
            toast.success(`${inFavorites ? "removed from" : "added to"} favorites`, { id: "fav" })
        }}>
            <Heart className="w-6 h-6" />
        </button>
    )
}