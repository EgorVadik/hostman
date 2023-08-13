import { createContext } from 'react'

type ThemeProviderState = {
    theme: string
    setTheme: (theme: string) => void
}

const initialState = {
    theme: 'system',
    setTheme: () => null,
}

export const ThemeProviderContext =
    createContext<ThemeProviderState>(initialState)
