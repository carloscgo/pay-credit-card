import { render, screen } from '@testing-library/react'
import Loading from './'

describe('Loading Component', () => {
  it('renders the loading spinner when isLoading is true', () => {
    render(<Loading isLoading={true} />)
    const spinnerElement = screen.getByTestId('loading')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('does not render the loading spinner when isLoading is false', () => {
    render(<Loading isLoading={false} />)
    const spinnerElement = screen.queryByTestId('loading')
    expect(spinnerElement).toBeNull()
  })
})
