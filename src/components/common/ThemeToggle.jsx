import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { copy } from '../../data/copy'
export default function ThemeToggle() { const { theme, toggleTheme } = useTheme();; return <button className="icon-button" onClick={toggleTheme} aria-label={theme === 'dark' ? copy.theme.light : copy.theme.dark}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button> }
