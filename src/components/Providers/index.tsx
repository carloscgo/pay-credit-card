import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'

import ErrorBoundary from '../ErrorBoundary'
import { BrowserRouter } from '../../utils/routes'
import store from '../../store'

export type ProvidersProps = {
  children: React.ReactNode // This is where you define the type for children
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <HelmetProvider>
          <Provider store={store}>{children}</Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default Providers
