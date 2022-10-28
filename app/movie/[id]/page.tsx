import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import client from "../../../utils/tmdb"

export default async function Page({ params }) {
    const router = useRouter()
    const movie = await client.movies.getMovie(params.id, ["keywords", "recommendations", "reviews", "videos", "lists"])
    return (
        <div className="w-full h-full flex flex-col px-4">
            <div className="w-full flex justify-between flex-col md:flex-row">
                <div className="card shadow-xl h-full">
                    <figure>
                        <Image src={client.getImageUrl(movie.poster_path, "w500")} width={500} height={720} alt={movie.title} />
                    </figure>
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row justify-evenly space-y-2 md:space-y-0">
                            {/* <div className="tooltip" data-tip={watchlist.find((e) => e === movie.id) !== undefined ? 'remove from watchlist' : 'add to watchlist'}>
                                <button className="btn btn-wide md:btn-block" disabled={!session_id || !accountID} onClick={async () => {
                                    const inWatchlist = watchlist.find((e) => e === movie.id) !== undefined
                                    await client.account.addToWatchlist({ media_id: movie.id, media_type: "movie", watchlist: !inWatchlist, accountID })
                                    if (inWatchlist) {
                                        setWatchlist((old) => old.filter((e) => e !== movie.id))
                                    } else {
                                        setWatchlist((old) => [...old, movie.id])
                                    }
                                    toast.success(`${inWatchlist ? "removed from" : "added to"} watchlist`)
                                }}>
                                    <Watchlist className="w-6 h-6" />
                                </button>
                            </div> */}
                            {/* <div className="tooltip" data-tip={favorites.find((e) => e === movie.id) !== undefined ? 'remove from favorites' : 'add to favorites'}>
                                 <button className="btn btn-wide md:btn-block" disabled={!session_id || !accountID} onClick={async () => {
                                    const inFavorites = favorites.find((e) => e === movie.id) !== undefined
                                    await client.account.markAsFavorite({ media_id: movie.id, media_type: "movie", favorite: !inFavorites, accountID })
                                    if (inFavorites) {
                                        setFavorites((old) => old.filter((e) => e !== movie.id))
                                    } else {
                                        setFavorites((old) => [...old, movie.id])
                                    }
                                    toast.success(`${inFavorites ? "removed from" : "added to"} favorites`)
                                }}>
                                    <Heart className="w-6 h-6" />
                                </button>
                            </div> */}

                        </div>
                    </div>
                </div>
                <div className="w-full px-2 lg:px-4">
                    <div className="flex flex-col space-y-2 md:space-y-0 md:items-center w-full mb-2">
                        <h1 className="font-bold text-2xl">{movie.title}</h1>
                        <span className="italic text-lg">{movie.tagline}</span>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal shadow w-full" >
                        <div className="stat">
                            <div className="stat-title">Release Date</div>
                            <div className="stat-value">{new Date(movie.release_date).toLocaleDateString(undefined, { dateStyle: "short" })}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Vote Count</div>
                            <div className="stat-value">{movie.vote_count}</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Vote Average</div>
                            <div className="stat-value">{movie.vote_average} / 10</div>
                        </div>
                    </div>
                    {/* {session_id &&
                        <div className="w-full flex justify-center">
                            <ReactStars
                                count={10}
                                onChange={async (value) => {
                                    if (interactionLocked) {
                                        toast.error("Please wait for the previous operation to finish")
                                        return;
                                    }
                                    setInteractionLocked(true)
                                    await client.movies.rate(parseInt(router.query['id'] as string), value)
                                    toast.success("Movie rated!")
                                    setInteractionLocked(false)
                                }}
                                size={30}
                            />
                        </div>
                    } */}
                    <div className="flex flex-col w-full">
                        <span className=" text-2xl text-center">Tags</span>
                        <div className="flex flex-wrap mb-2 mt-2 gap-4">
                            {movie.keywords.map((e) => <Link className="hover:scale-110 transition-transform btn btn-outline" key={e.id} href={`/keywords/movie/${e.id}`}>{e.name}</Link>)}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col w-full mt-3">
                        <span className=" text-2xl text-center">Overview</span>

                        <p>{movie.overview}</p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </div>
    )
}