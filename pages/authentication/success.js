import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Lottie from 'react-lottie-player'
import userContext from "../../context/userContext"
import client from "../../utils/tmdb"
import patching from "../../lottie/99274-loading.json"
import toast from "react-hot-toast"

export default function SuccessCallback() {
  const sessionContext = useContext(userContext)
  const router = useRouter()
  const [animationEnded, setAnimationEnded] = useState(false)



  useEffect(() => {
    const getSession = async () => {
      const res = await client.auth.createSession(router.query.request_token);
      sessionContext.setSessionId(res.session_id);
    }
    if (router.query.approved && !sessionContext.session_id) {
      getSession()
    }
  }, [router, sessionContext])

  useEffect(() => {
    if (sessionContext.session_id && animationEnded) {
      toast.success("Welcome!")
      router.push("/")
    }
  }, [animationEnded, sessionContext, router])

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