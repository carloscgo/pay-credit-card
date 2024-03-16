import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Some, httpAxios } from '../utils/httpAxios'
import formatNumber from '../utils/formatNumber'
import {
  fillProducts,
  setLoading,
  setError,
} from '../store/slices/product.slice'
import { AppDispatch, RootState } from '../store'

const getProducts = async (dispatch: AppDispatch) => {
  try {
    const products = await httpAxios.get('/products')

    if (products.length) {
      dispatch(
        fillProducts(
          products.map((product: Some) => ({
            id: product.id,
            name: product.title,
            price: formatNumber(product.price),
            image: product.image,
          }))
        )
      )
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)

      dispatch(setError(err.message))
    } else {
      console.error('An unknown error occurred', err)

      dispatch(setError('An unknown error occurred'))
    }
  } finally {
    dispatch(setLoading(false))
  }
}

const useGetProducts = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state: RootState) => state.product
  )

  useEffect(() => {
    !loading && getProducts(dispatch)
  }, [dispatch, loading])

  return {
    loading,
    error,
    products,
  }
}

export default useGetProducts
