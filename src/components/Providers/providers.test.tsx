/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react'
import Providers from './'

// Create a mock child component to verify rendering.
const ChildComponent = () => (
  <div data-testid="child-component">Child Component</div>
)

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: any }) => children,
}))
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: any }) => children,
}))
jest.mock('redux-persist/es/persistStore', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('Providers Component', () => {
  it('renders the child component', () => {
    const { getByTestId } = render(
      <Providers>
        <ChildComponent />
      </Providers>
    )

    expect(getByTestId('child-component')).toBeInTheDocument()
  })
})
