import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
export default function ThemeToggle() { const { theme, toggleTheme } = useTheme(); return <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button> }
