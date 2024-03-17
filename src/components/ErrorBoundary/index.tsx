import React, { ReactNode } from 'react'
import routes from '../../utils/routes'

interface ComponentProps {
  children: ReactNode
}

interface ComponentState {
  hasError: boolean
}

export const retry = () => {
  window.location.href = routes.home
}

class ErrorBoundary extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button type="button" onClick={retry}>
            Try again?
          </button>
        </div>
      )
    }

    // Some children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
