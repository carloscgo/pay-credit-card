/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import StepBar from './'
import paymentSlice, { setCurrentStep } from '../../store/slices/payment.slice'

// Create a mock store with the payment slice
const store = configureStore({
  reducer: {
    payment: paymentSlice,
  },
})

// Custom render function that takes the current step as an argument
const customRender = (currentStep: number, store: any) => {
  store.dispatch(setCurrentStep(currentStep))

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <StepBar />
      </MemoryRouter>
    </Provider>
  )
}

describe('StepBar Component', () => {
  const steps = ['Product', 'Credit Card Info', 'Summary', 'Final Status']

  it.each(steps.map((_, index) => [index + 1]))(
    'renders with step %i active',
    (stepNumber) => {
      const { getByText } = customRender(stepNumber, store)

      // Verify if the correct step is active
      const activeStepIndicator = getByText(stepNumber.toString())
      expect(activeStepIndicator).toHaveClass('bg-blue-600')
    }
  )
})
