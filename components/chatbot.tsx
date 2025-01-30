'use client'

import Script from "next/script";

export default function ChatBot() {
    return (
        <>
            <Script src="/chatbot.js"
            strategy="lazyOnload"
            onLoad={() => 0}
            />
        </>
    )
}
