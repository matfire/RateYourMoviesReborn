"use client";

import { useSearchParams, redirect } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import patching from "../../../lottie/99274-loading.json"
import sessionContext from "../../../contexts/sessionContext";
import client from "../../../utils/tmdb";

//TODO implement authentication back
export default function Page() {
    const params = useSearchParams()
    const [animationEnded, setAnimationEnded] = useState(false)
    const { setSession, session } = useContext(sessionContext)


    useEffect(() => {
        const createSession = async () => {
            const token = params.get("request_token");
            try {
                const session = await client.auth.createSession(token);
                setSession(session.session_id);
                localStorage.setItem("rym_session", session.session_id);
            } catch (error) { } finally {
                if (session) {
                    redirect("/")
                }
            }
        }
        if (params.get("approved")) {
            createSession();
        }
    }, [])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <span className="font-semibold text-2xl">Welcome back, we're patching you in...</span>
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