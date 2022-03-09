import API from "@matfire/the_movie_wrapper"

const client = new API(process.env.NEXT_PUBLIC_TMDB_KEY)

export default client;