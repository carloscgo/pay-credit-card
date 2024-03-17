/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import paymentSlice from '../../store/slices/payment.slice'
import ProductCard, { ProductCardProps } from '.'

jest.mock('../../utils/formatNumber', () =>
  jest.fn((number) => `Formatted ${number}`)
)

// Mock the `useNavigate` hook
const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => navigate),
}))

describe('ProductCard Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Create a mock store with the payment slice
  const store = configureStore({
    reducer: {
      payment: paymentSlice,
    },
  })

  const initialProps: ProductCardProps = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    image: 'test-image.jpg',
  }

  // Custom render to include providers
  const customRender = (store: any) => {
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard {...initialProps} />
        </MemoryRouter>
      </Provider>
    )
  }

  it('renders product information', () => {
    const { getByText, getByAltText } = customRender(store)

    expect(getByText('Test Product')).toBeInTheDocument()
    expect(getByText('Formatted 99.99')).toBeInTheDocument()
    expect(getByAltText('Test Product')).toHaveAttribute(
      'src',
      'test-image.jpg'
    )
  })

  it('dispatches fillPayment and navigates to payment route when buy now is clicked', () => {
    const { getByText } = customRender(store)

    // Simulate clicking the 'Buy now' button
    fireEvent.click(getByText(/buy now/i))

    // Assert that navigate function has been called with the correct route
    expect(navigate).toHaveBeenCalledWith('/payment')
  })
})
