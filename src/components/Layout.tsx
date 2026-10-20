import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

// MARK: Scroll management

function useScrollManagement() {
  const { pathname, search, hash, key } = useLocation()
  const navigate = useNavigate()
  const initialLoad = useRef(true)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      if (hash) navigate({ pathname, search }, { replace: true })
      return
    }

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
        target.focus({ preventScroll: true })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, search, hash, key, navigate])
}

// MARK: Layout

export function Layout() {
  useScrollManagement()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-lg bg-accent-strong px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
