import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './'

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()

describe('Input Component', () => {
  it('forwards the ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(
      <Input
        name="type"
        error=""
        onChange={onChangeMock}
        onBlur={onBlurMock}
        ref={ref}
      />
    )

    expect(ref.current).toBeInstanceOf(HTMLInputElement)

    const inputElement = screen.getByRole('textbox')

    expect(inputElement.className).not.toContain('border-red-400')
  })

  it('applies error styles when there is an error', () => {
    const errorMessage = 'This field is required.'
    render(
      <Input
        name="type"
        onChange={onChangeMock}
        onBlur={onBlurMock}
        error={errorMessage}
      />
    )

    const inputElement = screen.getByRole('textbox')
    expect(inputElement.className).toContain('border-red-400')
  })

  it('passes extra props down to the input element', () => {
    const placeholderText = 'Enter your text here'
    render(
      <Input
        name="type"
        error=""
        onChange={onChangeMock}
        onBlur={onBlurMock}
        placeholder={placeholderText}
      />
    )

    const inputElement = screen.getByPlaceholderText(placeholderText)
    expect(inputElement).toBeInTheDocument()
  })
})
