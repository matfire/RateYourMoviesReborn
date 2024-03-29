import { MovieReview } from "@matfire/the_movie_wrapper/dist/types/movie";
import Image from "next/image";
import client from "../../utils/tmdb";
import defaultImage from "../../images/defaultPicture.png"

export default function MovieReviewCard({ review }: { review: MovieReview }) {
    return (
        <div className="w-full flex flex-col lg:flex-row justify-evenly items-center mb-8">
            <div className="w-auto  lg:w-1/3">
                <Image alt={review.author} className="h-auto w-48" src={review.author_details.avatar_path ? client.getImageUrl(review.author_details.avatar_path, "w185") : defaultImage} width={185} height={185} />
            </div>
            <div className="w-auto lg:w-2/3">
                <p>{review.content}</p>
            </div>
        </div>
    )
}