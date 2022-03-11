import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import userContext from "../../context/userContext"
import client from "../../utils/tmdb"

export default function SuccessCallback() {
  const sessionContext = useContext(userContext)
  const router = useRouter()
  const {query} = router

  
  
  useEffect(() => {
    const getSession = async () => {
      const res = await client.auth.createSession();
      sessionContext.setSessionId(res.session_id);
    }
    if (query.approved) {
      getSession()
    }
  }, [query, sessionContext])

  return (
    <div>
      <span>Welcome back, we&apos;re patching you in</span>
    </div>
  )
}