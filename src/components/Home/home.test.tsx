import { render, screen } from '@testing-library/react'
import Home from './'

describe('Home Component', () => {
  it('renders the main heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Frontend Development Test')
    expect(heading).toHaveClass('text-3xl', 'font-bold', 'text-center')
  })

  it('renders the subheading', () => {
    render(<Home />)

    const subheading = screen.getByText('Software Engineering - Tech team', {
      selector: 'p',
    })
    expect(subheading).toBeInTheDocument()
    expect(subheading).toHaveClass('text-xl', 'text-center', 'my-4')
  })

  it('renders the description text', () => {
    render(<Home />)

    const description = screen.getByText(/credit card payment checkout/i)
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('text-lg', 'text-center', 'mb-8')
  })

  it('has a container with the correct styling', () => {
    render(<Home />)

    const container = screen.getByRole('main')
    expect(container).toHaveClass('container', 'mx-auto', 'px-4')
  })
})
