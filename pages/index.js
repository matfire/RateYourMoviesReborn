import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import MovieCard from '../components/movie/MovieCard'
import client from '../utils/tmdb'

export default function Home() {

  const [movies, setMovies] = useState([])

  const getMovies =  async (page=1) => {
    try {
      const data = await client.movies.getPopular({page});
      setMovies(old => [...old, ...data.results])
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (movies.length === 0) {
      getMovies()
    }
  }, [movies])


  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-col'>
        <div className='flex justify-between px-2'>
        <h4 className='font-semibold text-xl mb-1'>Latest Movies</h4>
        <Link href="/movie/popular">See More</Link>
        </div>
        <div className='gap-4 flex overflow-x-auto'>
          {
            movies.map((e) => <MovieCard key={e.id} movie={e} />)
          }
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h1>Something else here...</h1>
      </div>
    </div>
  )
}