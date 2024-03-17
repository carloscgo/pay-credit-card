/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import paymentSlice, {
  setCurrentStep,
  fillPayment,
} from '../../store/slices/payment.slice'
import routes from '../../utils/routes'
import Summary from './'

// Mock the `useNavigate` hook
const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => navigate),
}))

// Mock the `usePayment` hook
const completePay = jest.fn(() => Promise.resolve({}))

jest.mock('../../hooks/usePayment', () => ({
  __esModule: true,
  default: () => completePay,
}))

// Create a mock store with the payment slice
const store = configureStore({
  reducer: {
    payment: paymentSlice,
  },
})

// Custom render to include providers
const customRender = (store: any) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Summary />
      </MemoryRouter>
    </Provider>
  )
}

describe('Summary Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render summary with correct values', () => {
    store.dispatch(
      fillPayment({
        product: {
          id: 1,
          name: 'Product X',
          price: 100.0,
        },
        creditCard: {
          numberCard: '5018000000003456',
          holderName: 'Carlos Camacho',
          expireDate: '12/25',
          ccv: '123',
        },
      })
    )

    customRender(store)

    expect(screen.getByText('Order Summary')).toBeInTheDocument()
    expect(screen.getByText('Holder Name: Carlos Camacho')).toBeInTheDocument()
    expect(
      screen.getByText(/Card Number: \*\*\*\* \*\*\*\* \*\*\*\* 3456/)
    ).toBeInTheDocument()
    expect(screen.getByText('Expiry Date: 12/25')).toBeInTheDocument()
    expect(screen.getByText('Product Name: Product X')).toBeInTheDocument()
    expect(screen.getByText('Price: $100.00')).toBeInTheDocument()
  })

  it('should set current step to 3 on mount', () => {
    store.dispatch(
      fillPayment({
        product: {
          id: 1,
          name: 'Product X',
          price: 100.0,
        },
        creditCard: {
          numberCard: '5018000000003456',
          holderName: 'Carlos Camacho',
          expireDate: '12/25',
          ccv: '123',
        },
      })
    )

    store.dispatch(setCurrentStep(3))

    customRender(store)
    expect(store.getState().payment.currentStep).toEqual(3)
  })

  it('should navigate to home if product id or credit card number is missing', () => {
    store.dispatch(setCurrentStep(3))
    store.dispatch(
      fillPayment({
        product: {},
      })
    )

    customRender(store)

    expect(navigate).toHaveBeenCalledWith(routes.home, { replace: true })
  })

  it('completes payment and navigates to result page when button is clicked', async () => {
    store.dispatch(
      fillPayment({
        product: {
          id: 1,
          name: 'Product X',
          price: 100.0,
        },
        creditCard: {
          numberCard: '5018000000003456',
          holderName: 'Carlos Camacho',
          expireDate: '12/25',
          ccv: '123',
        },
      })
    )

    customRender(store)

    fireEvent.click(screen.getByText('Complete payment'))

    await expect(completePay).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith(routes.result, { replace: true })
  })
})
