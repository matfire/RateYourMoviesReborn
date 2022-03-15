import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import MovieCard from "../../components/movie/MovieCard";
import client from "../../utils/tmdb";

export default function Popular({initialMovies}) {
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const router = useRouter()




  useEffect(() => {
    setMovies(initialMovies.results)
  }, [initialMovies])

  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page))
    }
  }, [router])

  useEffect(() => {
    const fetchMovies = async() => {
      const res = await client.movies.getPopular({page})
      setMovies(res.results)
    }

    fetchMovies()

  }, [page, initialMovies, router])

  useEffect(() => {
    const changePage = (p) => {
      router.push(`/movie/popular?page=${p}`, undefined, {shallow:true})
    }
    if (page > 500) {
      changePage(500)
      toast.error("This page does not exist")
    }
  }, [page, router])

  const changePage = (p) => {
    router.push(`/movie/popular?page=${p}`, undefined, {shallow:true})
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-wrap justify-evenly gap-2">
        {movies.map((e) => (
          <div key={e.id}>
            <MovieCard movie={e} />
            </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="btn-group">
          <button className="btn" onClick={() => changePage(1)} disabled={page === 1}>First</button>
          <button className="btn" onClick={() => changePage(page -2 )} disabled={page -2 < 1}>{page - 2 }</button>
          <button className="btn" onClick={() => changePage(page - 1)} disabled={page - 1 < 1}>{page - 1}</button>
          <button className="btn" disabled>{page}</button>
          <button className="btn" onClick={() => changePage(page + 1)} disabled={page + 1 > 500}>{page + 1}</button>
          <button className="btn" onClick={() => changePage(page + 2)} disabled={page + 2 > 500}>{page + 2}</button>
          <button className="btn" onClick={() => changePage(500)} disabled={page === 500}>Last</button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps({query}) {
  try {
    const res = await client.movies.getPopular({page: query.page})
    return {
      props: {
        initialMovies: JSON.parse(JSON.stringify(res))
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        initialMovies: {
          results: []
        }
      }
    }
  }

}