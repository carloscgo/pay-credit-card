import React, { ReactNode } from 'react'
import routes from '../../utils/routes'
import Button from '../Button'

interface ComponentProps {
  children: ReactNode
}

interface ComponentState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  retry() {
    window.location.href = routes.home
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900">Error</h1>

            <p className="text-2xl font-light text-gray-600">
              Oops, there is an error!
            </p>

            <Button
              type="button"
              className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={this.retry}
            >
              Try again?
            </Button>
          </div>
        </div>
      )
    }

    // Some children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
