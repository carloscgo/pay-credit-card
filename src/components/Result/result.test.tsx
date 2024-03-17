/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { configureStore } from '@reduxjs/toolkit'
import paymentSlice, {
  fillPayment,
  setCurrentStep,
} from '../../store/slices/payment.slice'
import { StatusTransaction } from '../../hooks/usePayment'
import Result from './'

// Create a mock store with the payment slice
const store = configureStore({
  reducer: {
    payment: paymentSlice,
  },
})

// Custom render to include providers
const customRender = (
  ui: React.ReactElement,
  { store, route = '/' }: { store: any; route?: any }
) => {
  window.history.pushState({}, 'Test page', route)

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="*" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

describe('Result Component', () => {
  it('navigates to home if transaction id is undefined', () => {
    store.dispatch(setCurrentStep(4))

    customRender(<Result />, { store })

    expect(window.location.pathname).toBe('/')
  })

  it('shows success message when transaction status is success', () => {
    store.dispatch(setCurrentStep(4))
    store.dispatch(
      fillPayment({
        transaction: {
          status: StatusTransaction.success,
          id: '12345',
        },
      })
    )

    customRender(<Result />, { store })

    expect(screen.getByText('Transaction ID:')).toBeInTheDocument()
    expect(screen.getByText('12345')).toBeInTheDocument()
    expect(screen.getByText('Success')).toHaveClass('text-green-500')
  })

  it('shows error message and retry button when transaction status is error', () => {
    store.dispatch(setCurrentStep(4))
    store.dispatch(
      fillPayment({
        transaction: {
          status: StatusTransaction.error,
          messageError: 'Payment failed',
          id: '67890',
        },
      })
    )

    customRender(<Result />, { store })

    const errorMessage = screen.getByText(/error - Payment failed/i)
    expect(errorMessage).toHaveClass('text-red-500')

    const retryButton = screen.getByText('Try again payment')
    expect(retryButton).toBeVisible()

    // Simulate button click
    userEvent.click(retryButton)

    expect(window.location.pathname).toBe('/')
  })
})
