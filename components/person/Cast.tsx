import { Cast } from "@matfire/the_movie_wrapper/dist/types/generic";
import Image from "next/image";
import profilePicDefault from "../../images/castNotFound.png"
import client from "../../utils/tmdb";

export default function CastCard({ cast }: { cast: Cast }) {
    return (
        <div className="flex-none flex flex-col justify-center items-center w-96 snap-center">
            <Image className="rounded-xl" alt={cast.name} src={cast.profile_path ? client.getImageUrl(cast.profile_path, "w185") : profilePicDefault} height={185} width={277} />
            <p>{cast.name}</p>
            <p>as</p>
            <p>{cast.character}</p>
        </div>
    )
}