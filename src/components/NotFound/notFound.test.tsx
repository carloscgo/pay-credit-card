import { BrowserRouter as Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import routes from '../../utils/routes'
import NotFound from './'

describe('NotFound Component', () => {
  it('should display a 404 error message', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )

    const errorMessage = screen.getByText('404')
    expect(errorMessage).toBeInTheDocument()
  })

  it('should inform that the page does not exist', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )

    const notFoundMessage = screen.getByText(
      /The page you're looking for doesn't exist./i
    )
    expect(notFoundMessage).toBeInTheDocument()
  })

  it('should have a link to go back home', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )

    const homeLink = screen.getByRole('link', { name: /Go back home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', routes.home)
  })

  it('should correctly apply tailwind styles to the go back home link', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    )

    const homeLink = screen.getByRole('link', { name: /Go back home/i })
    expect(homeLink).toHaveClass(
      'inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
    )
  })
})
