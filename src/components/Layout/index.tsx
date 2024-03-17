import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useGetProducts from '../../hooks/useGetProducts'
import routes, { Link, Route, Routes } from '../../utils/routes'
import NavBar from '../NavBar'
import Loading from '../Loading'
import ErrorMessage from '../ErrorMessage'
import Home from '../Home'
import Products from '../Products'
import Payment from '../Payment'
import Summary from '../Summary'
import Result from '../Result'
import StepBar from '../StepBar'
import NotFound from '../NotFound'

const Layout = () => {
  const location = useLocation()

  const [error, setError] = useState('')

  const { loading: loadingProducts, error: errorProducts } = useGetProducts()

  const loading = loadingProducts

  useEffect(() => {
    setError(errorProducts || '')
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
        <div className="relative z-10 p-4 w-[100%] lg:w-[calc(100%-50px)] h-[90vh] flex flex-col items-center justify-center">
          {[
            routes.products,
            routes.payment,
            routes.summary,
            routes.result,
          ].some((str) => location.pathname.includes(str)) && <StepBar />}

          <div className="lg:w-[80%] w-[100%] lg:h-[80%] h-[90%] m-auto p-20px md:p-[50px] bg-white bg-opacity-30 backdrop-filter backdrop-blur shadow-xl shadow-gray-200 rounded-lg overflow-y-auto scrollbar-rounded">
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.products} element={<Products />} />
              <Route path={routes.payment} element={<Payment />} />
              <Route path={routes.summary} element={<Summary />} />
              <Route path={routes.result} element={<Result />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
