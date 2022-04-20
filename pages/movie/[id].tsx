import { Movie } from "@matfire/the_movie_wrapper/lib/types/movie"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"
import ReactStars from "react-rating-stars-component"
import { useRecoilState, useRecoilValue } from "recoil"
import { movieFavorite } from "../../context/atoms/movieFavorite"
import { movieWatchlist } from "../../context/atoms/movieWatchlist"
import { accountIdSelector } from "../../context/selectors/accountIdSelector"
import { sessionSelector } from "../../context/selectors/sessionSelector"
import Heart from "../../icons/Heart"
import Watchlist from "../../icons/Watchlist"
import client from "../../utils/tmdb"

export default function MovieDetails(props: { movie: Movie }) {
  const router = useRouter()
  const [interactionLocked, setInteractionLocked] = useState(false)
  const [watchlist, setWatchlist] = useRecoilState(movieWatchlist)
  const [favorites, setFavorites] = useRecoilState(movieFavorite)
  const session_id = useRecoilValue(sessionSelector)
  const accountID = useRecoilValue(accountIdSelector)

  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="w-full flex justify-between flex-col md:flex-row">
        <div className="card shadow-xl h-full">
          <figure>
            <Image src={client.getImageUrl(props.movie.poster_path, "w500")} width={500} height={720} alt={props.movie.title} className="hover:scale-125 transition-transform" />
          </figure>
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-evenly space-y-2 md:space-y-0">
              <div className="tooltip" data-tip={watchlist.find((e) => e === props.movie.id) !== undefined ? 'remove from watchlist' : 'add to watchlist'}>
                <button className="btn btn-wide md:btn-block" disabled={!session_id || !accountID} onClick={async () => {
                  const inWatchlist = watchlist.find((e) => e === props.movie.id) !== undefined
                  await client.account.addToWatchlist({ media_id: props.movie.id, media_type: "movie", watchlist: !inWatchlist, accountID })
                  if (inWatchlist) {
                    setWatchlist((old) => old.filter((e) => e !== props.movie.id))
                  } else {
                    setWatchlist((old) => [...old, props.movie.id])
                  }
                  toast.success(`${inWatchlist ? "removed from" : "added to"} watchlist`)
                }}>
                  <Watchlist className="w-6 h-6" />
                </button>
              </div>
              <div className="tooltip" data-tip={favorites.find((e) => e === props.movie.id) !== undefined ? 'remove from favorites' : 'add to favorites'}>
                <button className="btn btn-wide md:btn-block" disabled={!session_id || !accountID} onClick={async () => {
                  const inFavorites = favorites.find((e) => e === props.movie.id) !== undefined
                  await client.account.markAsFavorite({ media_id: props.movie.id, media_type: "movie", favorite: !inFavorites, accountID })
                  if (inFavorites) {
                    setFavorites((old) => old.filter((e) => e !== props.movie.id))
                  } else {
                    setFavorites((old) => [...old, props.movie.id])
                  }
                  toast.success(`${inFavorites ? "removed from" : "added to"} favorites`)
                }}>
                  <Heart className="w-6 h-6" />
                </button>
              </div>

            </div>
          </div>
        </div>
        <div className="w-full px-2">
          <div className="flex flex-col space-y-2 md:space-y-0 md:items-center w-full mb-2">
            <h1 className="font-bold text-2xl">{props.movie.title}</h1>
            <span className="italic text-lg">{props.movie.tagline}</span>
          </div>
          <div className="stats justify-center shadow w-full" >
            <div className="stat">
              <div className="stat-title">Release Date</div>
              <div className="stat-value">{new Date(props.movie.release_date).toDateString()}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Vote Count</div>
              <div className="stat-value">{props.movie.vote_count}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Vote Average</div>
              <div className="stat-value">{props.movie.vote_average} / 10</div>
            </div>
          </div>
          {session_id &&
            <div>
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
          }
          <div className="flex justify-evenly flex-wrap mb-2 mt-2">
            {props.movie.keywords.map((e) => <span onClick={() => router.push(`/keywords/movie/${e.id}`)} className="badge hover:scale-110 transition-transform cursor-pointer" key={e.id}>{e.name}</span>)}
          </div>
          <div>
            <p>{props.movie.overview}</p>
          </div>
          <div>

          </div>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const res = await client.movies.getMovie(parseInt(query.id), ["keywords", "recommendations", "reviews", "videos", "lists"])
    return {
      props: {
        movie: res
      }
    }
  } catch (error) {
    throw ("Could not find requested Movie")
  }
}