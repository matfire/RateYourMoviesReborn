import { setLazyProp } from "next/dist/server/api-utils"
import Image from "next/image"
import { useRouter } from "next/router"
import {useEffect, useState} from "react"
import toast from "react-hot-toast"
import client from "../../utils/tmdb"


export default function MovieDetails({ movie }) {
  const router = useRouter()


  return (
    <div className="w-full h-full flex flex-col px-4">
      <div className="w-full flex justify-between flex-col md:flex-row">

        <Image src={client.getImageUrl(movie.poster_path, "w500")} width={700} height={980} alt={movie.title} className="w-screen" />
        <div className="w-full px-2">
          <div className="flex flex-col items-center w-full">
            <h1 className="font-bold text-2xl">{movie.title}</h1>
            <span className="italic text-lg">{movie.tagline}</span>
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