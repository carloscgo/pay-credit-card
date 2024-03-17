import { render } from '@testing-library/react'
import * as redux from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { setCurrentStep } from '../../store/slices/payment.slice'
import Products from './'

// Mocking useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

// Mocking useGetProducts hook
jest.mock('../../hooks/useGetProducts', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    loading: false,
    error: '',
    products: [
      {
        id: 1,
        name: 'Product 1',
        price: 100,
        image: 'url-image',
      },
      {
        id: 2,
        name: 'Product 2',
        price: 200,
        image: 'url-image',
      },
    ],
  })),
}))

describe('Products Component', () => {
  const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
  const mockDispatchFn = jest.fn()
  useDispatchSpy.mockReturnValue(mockDispatchFn)

  it('should dispatch setCurrentStep with 1 on mount', () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    )

    expect(mockDispatchFn).toHaveBeenCalledWith(setCurrentStep(1))
  })

  it('should render ProductCard for each product', () => {
    const { getByText, getAllByRole } = render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    )

    // Expect two ProductCard components to be rendered
    expect(getAllByRole('img').length).toBe(2)
    expect(getByText('Product 1')).toBeInTheDocument()
    expect(getByText('Product 2')).toBeInTheDocument()
  })
})
