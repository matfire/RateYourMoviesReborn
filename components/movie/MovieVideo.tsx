"use client";

import { Video } from "@matfire/the_movie_wrapper/dist/types/generic";

//TODO implement other medias
export default function MovieVideo({ video }: { video: Video }) {
    console.log(video)
    const getVideoUrl = (site, key) => {
        console.log(site, key)
        switch(site) {
            case("YouTube"):
                return <iframe allowFullScreen width={400} height={300} src={`https://www.youtube.com/embed/${key}`} />
            default:
                return ""
        }
    }


    const vid = getVideoUrl(video.site, video.key)
    return (
        <div>
            {vid}
        </div>
    )
}