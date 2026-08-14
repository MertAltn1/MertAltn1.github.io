import { lazy, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'

// The home page carries the whole story; detail routes are the only extra bundles.
const ExperienceDetailPage = lazy(() => import('./pages/ExperienceDetailPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Suspense fallback={<div className="route-loader">Loading…</div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="experience/:slug" element={<ExperienceDetailPage />} />
              <Route path="projects/:slug" element={<ProjectDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  )
}
