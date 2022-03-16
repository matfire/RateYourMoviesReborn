import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Lottie from 'react-lottie-player'
import client from "../../utils/tmdb"
import patching from "../../lottie/99274-loading.json"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { userState } from "../../context/atoms/user"

export default function SuccessCallback() {
  const router = useRouter()
  const [animationEnded, setAnimationEnded] = useState(false)
  const [user, setUser] = useRecoilState(userState)


  useEffect(() => {
    const getSession = async () => {
      const res = await client.auth.createSession(router.query.request_token);
      setUser((old) => (
        {...old, session_id: res.session_id}
      ))
    }
    if (router.query.approved && !sessionContext.session_id) {
      getSession()
    }
  }, [router, setUser])

  useEffect(() => {
    if (user.session_id && animationEnded) {
      toast.success("Welcome!")
      router.push("/")
    }
  }, [animationEnded, user, router])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <span className="font-semibold text-2xl">Welcome back, we&apos;re patching you in...</span>
      <Lottie 
        animationData={patching}
        loop={false}
        play
        className="w-1/3 h-auto p-4"
        onComplete={() => setAnimationEnded(true)}
      />
    </div>
  )
}