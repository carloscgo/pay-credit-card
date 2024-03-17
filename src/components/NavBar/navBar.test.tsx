import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from './'

jest.mock('../../utils/routes', () => ({
  home: '/home',
  products: '/products',
}))

// Helper function to wrap NavBar with Router for rendering
const renderWithRouter = (ui: JSX.Element) => {
  return render(<Router>{ui}</Router>)
}

const fireResize = (width: number) => {
  window.innerWidth = width
  window.dispatchEvent(new Event('resize'))
}

describe('NavBar Component', () => {
  it('menu toggle works correctly', () => {
    renderWithRouter(<NavBar />)

    fireResize(500)

    const menuToggleButton = screen.getByRole('button')
    fireEvent.click(menuToggleButton)
    const menuItems = screen.getAllByTestId('menuitem')

    expect(menuItems).toHaveLength(1)

    fireEvent.click(menuToggleButton)
    expect(() => screen.getAllByRole('menuitem')).toThrow()
  })

  it('menu item selection changes active content', () => {
    renderWithRouter(<NavBar />)

    const menuToggleButton = screen.getByRole('button')
    fireEvent.click(menuToggleButton)

    const productsMenuItem = screen.getAllByText(/Products/i)[0].closest('li')
    fireEvent.click(productsMenuItem!)

    expect(productsMenuItem).toHaveClass('text-blue-500')

    const homeMenuItem = screen.getAllByText(/Home/i)[0].closest('li')
    fireEvent.click(homeMenuItem!)

    expect(homeMenuItem).toHaveClass('text-blue-500')
  })
})
