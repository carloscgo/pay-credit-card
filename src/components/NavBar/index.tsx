import { useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../utils/routes'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeContent, setActiveContent] = useState('home')

  const onSelectHandler = (action: string) => () => {
    setActiveContent(action)
  }

  return (
    <>
      <button
        data-testid="menuitem"
        className="md:hidden text-gray-500 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Horizontal Menu for large screens */}
      <ul className="hidden md:flex items-center space-x-4 mx-10">
        <li
          className={`flex items-center cursor-pointer ${
            activeContent === 'home' ? 'text-blue-500' : ''
          }`}
          onClick={onSelectHandler('home')}
        >
          <Link to={routes.home} className="button">
            Home
          </Link>
        </li>
        <li
          className={`flex items-center cursor-pointer ${
            activeContent === 'products' ? 'text-blue-500' : ''
          }`}
          onClick={onSelectHandler('products')}
        >
          <Link to={routes.products} className="button">
            Products
          </Link>
        </li>
      </ul>

      {/* Vertical Menu for small/medium screens */}
      <ul
        className={`absolute z-20 ${
          isMenuOpen ? 'flex' : 'hidden'
        } flex-col top-full right-0 w-48 py-2 px-3 bg-white shadow-lg`}
      >
        <li
          className={`flex items-center cursor-pointer ${
            activeContent === 'home' ? 'text-blue-500' : ''
          }`}
          onClick={onSelectHandler('home')}
        >
          <Link to={routes.home} className="button">
            Home
          </Link>
        </li>
        <li
          className={`flex items-center cursor-pointer ${
            activeContent === 'products' ? 'text-blue-500' : ''
          }`}
          onClick={onSelectHandler('products')}
        >
          <Link to={routes.products} className="button">
            Products
          </Link>
        </li>
      </ul>
    </>
  )
}

export default NavBar
