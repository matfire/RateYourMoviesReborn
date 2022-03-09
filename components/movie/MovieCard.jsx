import Image from "next/image";
import client from "../../utils/tmdb";

export default function MovieCard({ movie }) {
  return (
    <div className="w-full h-full">
      <div className="w-64 lg:w-96">
        <Image src={client.getImageUrl(movie.poster_path, "w500")} width={500} height={700} alt={movie.title} />
      </div>
    </div>
  )
}