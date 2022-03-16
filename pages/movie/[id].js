import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"
import ReactStars from "react-rating-stars-component"
import { useRecoilState, useRecoilValue } from "recoil"
import { movieWatchlist } from "../../context/atoms/watchlist"
import { accountIdSelector } from "../../context/selectors/accountIdSelector"
import { sessionSelector } from "../../context/selectors/sessionSelector"
import Watchlist from "../../icons/Watchlist"
import client from "../../utils/tmdb"


export default function MovieDetails({ movie }) {
  const router = useRouter()
  const [interactionLocked, setInteractionLocked] = useState(false)
  const [watchlist, setWatchlist] = useRecoilState(movieWatchlist)
  const session_id = useRecoilValue(sessionSelector)
  const accountID = useRecoilValue(accountIdSelector)

  useEffect(() => {
    console.log(watchlist)
  }, [watchlist])

  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="w-full flex justify-between flex-col md:flex-row">
        <div className="card shadow-xl h-full">
          <figure>
            <Image src={client.getImageUrl(movie.poster_path, "w500")} width={500} height={720} alt={movie.title} className="hover:scale-125 transition-transform" />
          </figure>
          <div className="card-body">
            <button className="btn" disabled={!session_id || !accountID} onClick={async() => {

            }}>
              <Watchlist className="w-6 h-6" />
            </button>
            <button>

            </button>
          </div>
        </div>
        <div className="w-full px-2">
          <div className="flex flex-col space-y-2 md:space-y-0 md:items-center w-full mb-2">
            <h1 className="font-bold text-2xl">{movie.title}</h1>
            <span className="italic text-lg">{movie.tagline}</span>
          </div>
          <div className="mb-2 flex flex-col md:flex-row justify-between md:justify-evenly">
            <span>Released on <span>{new Date(movie.release_date).toDateString()}</span></span>
            <span>{movie.vote_average} / 10</span>
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
                    await client.movies.rate(router.query.id, value)
                    toast.success("Movie rated!")
                    setInteractionLocked(false)
                  }}
                  size={30}
                />
              </div>
            }
          </div>
          <div>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const res = await client.movies.getMovie(parseInt(query.id))
    return {
      props: {
        movie: JSON.parse(JSON.stringify(res))
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}