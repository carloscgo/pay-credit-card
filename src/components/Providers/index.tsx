import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import ErrorBoundary from '../ErrorBoundary'
import { BrowserRouter } from '../../utils/routes'
import store, { persistor } from '../../store'

export type ProvidersProps = {
  children: React.ReactNode // This is where you define the type for children
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <HelmetProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </Provider>
        </HelmetProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default Providers
