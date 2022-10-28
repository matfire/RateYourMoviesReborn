import MovieCard from "../../../components/movie/MovieCard";
import client from "../../../utils/tmdb";

export default async function Page() {

    const movies = await client.movies.getPopular({ page: 1 })
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex flex-wrap justify-evenly gap-2">
                {movies.results.map((e) => (
                    <div key={e.id}>
                        <MovieCard movie={e} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <div className="btn-group">
                    {/* <button className="btn" onClick={() => changePage(1)} disabled={page === 1}>First</button>
                    <button className="btn" onClick={() => changePage(page - 2)} disabled={page - 2 < 1}>{page - 2}</button>
                    <button className="btn" onClick={() => changePage(page - 1)} disabled={page - 1 < 1}>{page - 1}</button> */}
                    <button className="btn" disabled>{movies.page}</button>
                    {/* <button className="btn" onClick={() => changePage(page + 1)} disabled={page + 1 > 500}>{page + 1}</button>
                    <button className="btn" onClick={() => changePage(page + 2)} disabled={page + 2 > 500}>{page + 2}</button>
                    <button className="btn" onClick={() => changePage(500)} disabled={page === 500}>Last</button> */}
                </div>
            </div>
        </div>
    )
}