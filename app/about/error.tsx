'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { startTransition} from "react"
import {router} from "next/client";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    const router = useRouter()

    const onError = () => {
        startTransition(() => {
            router.refresh()
            reset()
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <p className="text-gray-700 mb-4">{error.message}</p>
            <button
                onClick={() => onError()}
                className="bg-blue-500 text-white hover:bg-blue-600"
            >
                Try again
            </button>
        </div>
    )
}
