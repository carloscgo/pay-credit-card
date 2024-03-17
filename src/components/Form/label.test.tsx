import { render, screen } from '@testing-library/react'
import { Label } from './'

describe('Label Component', () => {
  it('renders the children content', () => {
    const labelText = 'Test Label'
    render(<Label>{labelText}</Label>)

    const labelElement = screen.getByText(labelText)
    expect(labelElement).toBeInTheDocument()
  })

  it('has the correct class names', () => {
    render(<Label>Label</Label>)

    const labelElement = screen.getByText('Label')
    expect(labelElement).toHaveClass('text-neutral-800')
    expect(labelElement).toHaveClass('font-bold')
    expect(labelElement).toHaveClass('text-sm')
    expect(labelElement).toHaveClass('mb-2')
    expect(labelElement).toHaveClass('block')
  })
})
