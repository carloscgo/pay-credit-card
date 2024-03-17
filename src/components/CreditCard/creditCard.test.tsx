import { render, screen } from '@testing-library/react'
import { CreditCard, TypeCard } from './'

describe('CreditCard Component', () => {
  it('renders the credit card with all provided information', () => {
    render(
      <CreditCard
        type={'Visa' as TypeCard}
        numberCard="1234 5678 9012 3456"
        holderName="John Doe"
        expireDate="12/25"
      />
    )

    expect(screen.getByText('1234 5678 9012 3456')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('12/25')).toBeInTheDocument()
  })

  it('displays the appropriate card type logo', () => {
    const { getByTestId } = render(
      <CreditCard
        type={'Mastercard' as TypeCard}
        numberCard="1234 5678 9012 3456"
        holderName="Jane Smith"
        expireDate="11/24"
      />
    )

    expect(getByTestId('logo-card').getAttribute('href')).toBe(
      '/icons/mastercard.svg'
    )
  })
})
