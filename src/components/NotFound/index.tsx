import { Link } from 'react-router-dom'
import routes from '../../utils/routes'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>

        <p className="text-2xl font-light text-gray-600">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to={routes.home}
          className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
