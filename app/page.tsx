import Link from 'next/link'
import MovieCard from '../components/movie/MovieCard'
import client from '../utils/tmdb'

export default async function Page() {
  const movies = await client.movies.getPopular({ page: 1 })
  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-col'>
        <div className='flex justify-between px-2'>
          <h4 className='font-semibold text-xl mb-1'>Latest Movies</h4>
          <Link href="/movie/popular">See More</Link>
        </div>
        <div className='gap-4 flex overflow-x-auto'>
          {
            movies.results.map((e) => <MovieCard key={e.id} movie={e} />)
          }
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1>Something else here...</h1>
      </div>
    </div>
  )
}