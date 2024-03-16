import { useEffect, useState } from 'react'
import useGetProducts from '../../hooks/useGetProducts'
import routes, { Link, Route, Routes } from '../../utils/routes'
import Home from '../Home'
import Products from '../Products'
import Payment from '../Payment'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'

const Layout = () => {
  const [activeContent, setActiveContent] = useState('home')
  const [error, setError] = useState('')

  const { loading: loadingProducts, error: errorProducts } = useGetProducts()

  const loading = loadingProducts

  useEffect(() => {
    errorProducts && setError(errorProducts)
  }, [errorProducts])

  const handleCloseError = () => {
    setError('')
  }

  return (
    <>
      <Loading isLoading={loading} />
      <ErrorMessage errorMessage={error} onClose={handleCloseError} />

      <div className="relative min-h-screen bg-gray-100">
        <div className="relative z-10 p-4 bg-white shadow-md flex items-center justify-between">
          <h4 className="text-gray-700 text-4xl font-semibold">Shop Payment</h4>

          <ul className="flex items-center space-x-4 mx-10 gap-10">
            <li
              className={`flex items-center cursor-pointer ${
                activeContent === 'home' ? 'text-blue-500' : ''
              }`}
              onClick={() => setActiveContent('home')}
            >
              <Link to={routes.home} className="button">
                Home
              </Link>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                activeContent === 'products' ? 'text-blue-500' : ''
              }`}
              onClick={() => setActiveContent('products')}
            >
              <Link to={routes.products} className="button">
                Products
              </Link>
            </li>
            <li
              className={`flex items-center cursor-pointer ${
                activeContent === 'payment' ? 'text-blue-500' : ''
              }`}
              onClick={() => setActiveContent('payment')}
            >
              <Link to={routes.payment} className="button">
                Payment
              </Link>
            </li>
          </ul>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 w-[100%] h-[90vh] flex items-center justify-center">
          <div className="w-[80%] h-[80%] m-auto p-[50px] bg-white bg-opacity-30 backdrop-filter backdrop-blur shadow-xl shadow-gray-200 rounded-lg overflow-y-auto scrollbar-rounded">
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.products} element={<Products />} />
              <Route path={routes.payment} element={<Payment />} />
              <Route path="*" element={<p>404</p>} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
