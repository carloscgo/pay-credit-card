import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from './'

describe('ErrorMessage Component', () => {
  it('renders the error message when provided', () => {
    const errorMessage = 'An unexpected error occurred.'
    render(<ErrorMessage errorMessage={errorMessage} onClose={() => {}} />)

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('does not render if errorMessage is empty', () => {
    render(<ErrorMessage errorMessage="" onClose={() => {}} />)

    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })

  it('calls the onClose handler when the close button is clicked', () => {
    const onCloseMock = jest.fn()
    const errorMessage = 'An unexpected error occurred.'

    render(<ErrorMessage errorMessage={errorMessage} onClose={onCloseMock} />)

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
