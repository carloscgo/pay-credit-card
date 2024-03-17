import { render, screen } from '@testing-library/react'
import Button from './'

describe('<Button />', () => {
  it('renders a button element by default', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByRole('button', { name: 'Click Me' })
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement.tagName).toBe('BUTTON')
  })

  it('renders an anchor element when "href" is provided', () => {
    render(
      <Button as="a" href="https://example.com">
        Visit Example
      </Button>
    )
    const anchorElement = screen.getByRole('link', { name: 'Visit Example' })
    expect(anchorElement).toBeInTheDocument()
    expect(anchorElement.tagName).toBe('A')
    expect(anchorElement).toHaveAttribute('href', 'https://example.com')
  })

  it('applies appropriate class names based on "disabled" prop', () => {
    render(<Button disabled>Disabled Button</Button>)
    const buttonElement = screen.getByRole('button', {
      name: 'Disabled Button',
    })
    expect(buttonElement).toHaveClass('bg-gray-400')
    expect(buttonElement).not.toHaveClass('bg-blue-700 hover:bg-blue-800')
  })

  it('passes additional props to the underlying element', () => {
    render(<Button data-testid="custom-button">Custom Props</Button>)
    const buttonElement = screen.getByTestId('custom-button')
    expect(buttonElement).toBeInTheDocument()
  })
})
