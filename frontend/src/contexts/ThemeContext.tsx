import { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
    theme: Theme
    resolvedTheme: 'light' | 'dark'
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem('bandhu_theme')
        return (saved as Theme) || 'light'
    })

    const getResolvedTheme = useCallback((t: Theme): 'light' | 'dark' => {
        if (t === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return t
    }, [])

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => getResolvedTheme(theme))

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t)
        localStorage.setItem('bandhu_theme', t)
    }, [])

    useEffect(() => {
        const resolved = getResolvedTheme(theme)
        setResolvedTheme(resolved)

        const root = document.documentElement
        if (resolved === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [theme, getResolvedTheme])

    // Listen for system theme changes
    useEffect(() => {
        if (theme !== 'system') return

        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
            const resolved = getResolvedTheme('system')
            setResolvedTheme(resolved)
            if (resolved === 'dark') {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
        mql.addEventListener('change', handler)
        return () => mql.removeEventListener('change', handler)
    }, [theme, getResolvedTheme])

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
