import Image from "next/image";
import client from "../../utils/tmdb";
import { Movie } from "@matfire/the_movie_wrapper/dist/types/movie";
import Link from "next/link";

export default function MovieCard({ movie }: { movie: Movie }) {

  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="w-full h-full flex flex-col justify-center items-center snap-center">
        <div className="w-80 lg:w-96 relative group cursor-pointer ">
          <Image src={client.getImageUrl(movie.poster_path, "w500")} width={500} height={700} alt={movie.title} />
          <div className="transition-opacity duration-150 hidden opacity-0 bg-base-100/70 group-hover:opacity-100 lg:flex w-full h-full absolute top-0 right-0 z-10 flex-col justify-center items-center">
            <span className="font-medium text-xl text-center">{movie.title}</span>
          </div>
        </div>
        <span className="block lg:hidden font-medium text-xl text-center">{movie.title}</span>
      </div>
    </Link>
  )
}