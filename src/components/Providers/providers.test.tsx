import { render } from '@testing-library/react'
import Providers from './'

// Create a mock child component to verify rendering.
const ChildComponent = () => (
  <div data-testid="child-component">Child Component</div>
)

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
