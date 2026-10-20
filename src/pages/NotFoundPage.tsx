import { useLocation } from 'react-router'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { ArrowLeftIcon } from '../components/Icons'
import { useDocumentMeta } from '../lib/meta'

// MARK: Not found

export function NotFoundPage() {
  const { pathname } = useLocation()
  useDocumentMeta({ title: 'Page not found', path: pathname, noindex: true })

  return (
    <Container className="grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-fg-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink to="/" variant="primary">
            <ArrowLeftIcon /> Back to home
          </ButtonLink>
        </div>
      </div>
    </Container>
  )
}
