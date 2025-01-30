'use client'

import {useState} from "react";
import useDarkMode from "@/hooks/use-dark-mode";

const nextModeIcons: any = {
    'light': '🌚',
    'dark': '🌝',
}

export default function DarkMode({defaultTheme}: any) {
    const { theme, toggleTheme } = useDarkMode(defaultTheme)
    return (
        <button onClick={toggleTheme}>
            {nextModeIcons [theme]}
        </button>
    )
}
