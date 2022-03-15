import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import ReactStars from "react-rating-stars-component"
import userContext from "../../context/userContext"
import client from "../../utils/tmdb"


export default function MovieDetails({ movie }) {
  const router = useRouter()
  const { session_id } = useContext(userContext)
  const [interactionLocked, setInteractionLocked] = useState(false)


  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="w-full flex justify-between flex-col md:flex-row">

        <Image src={client.getImageUrl(movie.poster_path, "w500")} width={700} height={980} alt={movie.title} className="hover:scale-125 transition-transform" />
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