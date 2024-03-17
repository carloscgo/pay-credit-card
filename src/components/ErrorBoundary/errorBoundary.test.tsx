/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react'
import ErrorBoundary, { retry } from './'

const ChildComponent = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test Error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeAll(() => {
    // Silence error logging for expected test errors
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should catch errors in child components and display fallback UI', () => {
    render(
      <ErrorBoundary>
        <ChildComponent shouldThrow />
      </ErrorBoundary>
    )

    expect(screen.getByText(/oops, there is an error!/i)).toBeInTheDocument()
  })

  it('should not alter the output when no errors are thrown by child components', () => {
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('should call the retry function when clicking the "Try again?" button', () => {
    render(
      <ErrorBoundary>
        <ChildComponent shouldThrow />
      </ErrorBoundary>
    )

    const tryAgainButton = screen.getByRole('button', { name: /try again?/i })
    fireEvent.click(tryAgainButton)

    expect(window.location.href).toBe('http://localhost/')
  })

  it('expect event to retry method', () => {
    retry()

    expect(window.location.href).toBe('http://localhost/')
  })
})
