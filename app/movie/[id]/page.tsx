import Image from "next/image"
import Link from "next/link"
import client from "../../../utils/tmdb"
import FavoritesAdd from "./FavoritesAdd"
import RateMovie from "./Rate"
import WatchlistAdd from "./WatchlistAdd"

export default async function Page({ params }) {
    const movie = await client.movies.getMovie(params.id, ["keywords", "recommendations", "reviews", "videos", "lists", "images"])
    return (
        <div className="w-full h-full flex flex-col px-4">
            <div className="w-full flex justify-between flex-col md:flex-row">
                <div className="card shadow-xl h-full">
                    <figure>
                        <Image src={client.getImageUrl(movie.poster_path, "w500")} width={500} height={720} alt={movie.title} />
                    </figure>
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row justify-evenly space-y-2 md:space-y-0">
                            <WatchlistAdd movieId={movie.id} />
                            <FavoritesAdd movieId={movie.id} />
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
                    <RateMovie movieId={movie.id} />
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
                </div>
            </div>
            <div className="w-full flex flex-col h-full">
                <div className="flex overflow-x-auto snap-x gap-4 lg:snap-none">
                    {movie.images.posters.map((poster) => (
                            <Image key={poster.file_path} className="snap-center" alt={`poster ${poster.file_path}`} src={client.getImageUrl(poster.file_path, "w500")} width={500} height={720} />
                    ))}
                </div>
            </div>
        </div>
    )
}