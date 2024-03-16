import { useEffect, useState } from 'react'
import useGetProducts from '../../hooks/useGetProducts'
import routes, { Link, Route, Routes } from '../../utils/routes'
import Home from '../Home'
import Products from '../Products'
import Payment from '../Payment'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import NavBar from '../NavBar'

const Layout = () => {
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
        <div className="relative z-20 p-4 bg-white shadow-md flex items-center justify-between md:justify-start">
          <h4 className="text-gray-700 lg:text-3xl md:text-2xl font-semibold mr-10">
            <Link to={routes.home}>Shop Payment</Link>
          </h4>

          <NavBar />
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 w-[100%] h-[90vh] flex items-center justify-center">
          <div className="lg:w-[80%] md:w-[85%] lg:h-[80%] md:h-[90%] m-auto p-[50px] bg-white bg-opacity-30 backdrop-filter backdrop-blur shadow-xl shadow-gray-200 rounded-lg overflow-y-auto scrollbar-rounded">
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
