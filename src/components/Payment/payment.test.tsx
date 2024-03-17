/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import paymentSlice, {
  setCurrentStep,
  fillPayment,
} from '../../store/slices/payment.slice'
import Payment from './'

// Mock the `useNavigate` hook
const navigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(() => navigate),
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
        <Payment />
      </MemoryRouter>
    </Provider>
  )
}

describe('Payment Component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render payment with correct values', () => {
    store.dispatch(
      fillPayment({
        product: {
          id: 1,
          name: 'Product X',
          price: 100.0,
        },
      })
    )

    customRender(store)

    expect(screen.getByText('Card number:')).toBeInTheDocument()
    expect(screen.getByText('Exp. date:')).toBeInTheDocument()
    expect(screen.getByText('CCV:')).toBeInTheDocument()
    expect(screen.getByText('Card holder:')).toBeInTheDocument()
  })

  it('should set current step to 2 on mount', () => {
    store.dispatch(setCurrentStep(2))

    customRender(store)
    expect(store.getState().payment.currentStep).toEqual(2)
  })
})
