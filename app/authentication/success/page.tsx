"use client";

import { useRouter } from "next/router";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import patching from "../../../lottie/99274-loading.json"

//TODO implement authentication back
export default function Page() {
    const params = useSearchParams()
    const [animationEnded, setAnimationEnded] = useState(false)
    const router = useRouter()


    useEffect(() => {

    }, [router])

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