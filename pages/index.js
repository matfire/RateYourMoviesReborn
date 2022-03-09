import Head from 'next/head'
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
    getMovies()
  }, [])


  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-col'>
        <h4 className='self-center font-semibold text-xl mb-4'>Latest Movies</h4>
        <div className='gap-4 h-full overflow-x-auto flex'>
          {
            movies.map((e) => <MovieCard key={e.id} movie={e} />)
          }
        </div>
      </div>
    </div>
  )
}