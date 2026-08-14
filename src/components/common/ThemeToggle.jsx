import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
export default function ThemeToggle() { const { theme, toggleTheme } = useTheme(); const { t } = useLanguage(); return <button className="icon-button" onClick={toggleTheme} aria-label={theme === 'dark' ? t.theme.light : t.theme.dark}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button> }
