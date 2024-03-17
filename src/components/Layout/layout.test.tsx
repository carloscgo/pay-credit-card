/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const middlewares: any = []
const mockStore = configureMockStore(middlewares)

// Initialize with an initial state
const initialState = {
  product: {
    loading: false,
    error: '',
    products: [],
  },
}
let store = mockStore(initialState)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}))

jest.mock('../NavBar', () => () => <div data-testid="nav-bar"></div>)
jest.mock('../Loading', () => () => <div>Loading...</div>)
jest.mock(
  '../ErrorMessage',
  () =>
    ({ errorMessage, onClose }: { errorMessage: any; onClose: any }) =>
      errorMessage ? (
        <div data-testid="error-message" onClick={onClose}>
          Error: {errorMessage}
        </div>
      ) : null
)
jest.mock('../Home', () => () => <div>Home Content</div>)

describe('Layout Component', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('renders without crashing', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Layout />
          </Provider>
        </BrowserRouter>
      )
    })

    expect(screen.getByText('Shop Payment')).toBeInTheDocument()
    expect(screen.getByTestId('nav-bar')).toBeInTheDocument()
  })

  it('displays loading indicator when loading products', () => {
    initialState.product.loading = true

    store = mockStore(initialState)

    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Layout />
          </Provider>
        </BrowserRouter>
      )
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders Home content on the home route', () => {
    act(() => {
      render(
        <BrowserRouter>
          <Provider store={store}>
            <Layout />
          </Provider>
        </BrowserRouter>
      )
    })

    expect(screen.getByText('Home Content')).toBeInTheDocument()
  })
})
