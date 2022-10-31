"use client";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import ReactStars from "react-rating-stars-component";
import sessionContext from "../../../contexts/sessionContext";
import client from "../../../utils/tmdb";

export default function RateMovie({ movieId }: { movieId: number }) {
    const { session } = useContext(sessionContext);
    const [interactionLocked, setInteractionLocked] = useState(false)
    if (!session) return null;
    return (
        <div className="w-full flex justify-center">
            <ReactStars
                count={10}
                onChange={async (value) => {
                    if (interactionLocked) {
                        toast.error("Please wait for the previous operation to finish")
                        return;
                    }
                    setInteractionLocked(true)
                    await client.movies.rate(movieId, value)
                    toast.success("Movie rated!")
                    setInteractionLocked(false)
                }}
                size={30}
            />
        </div>
    )
}