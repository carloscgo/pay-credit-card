import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Some, httpAxios } from '../utils/httpAxios'
import {
  fillProducts,
  setLoading,
  setError,
} from '../store/slices/product.slice'
import { AppDispatch, RootState } from '../store'

export const getProducts = async (
  dispatch: AppDispatch,
  setLoaded: (value: boolean) => void
) => {
  dispatch(setLoading(true))

  try {
    const products = await httpAxios.get('/products')

    if (products.length) {
      dispatch(
        fillProducts(
          products.map((product: Some) => ({
            id: product.id,
            name: product.title,
            price: product.price,
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
    setLoaded(true)
  }
}

const useGetProducts = () => {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(
    (state: RootState) => state.product
  )
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    !loading && !loaded && getProducts(dispatch, setLoaded)
  }, [dispatch, loading, loaded])

  return {
    loading,
    error,
    products,
  }
}

export default useGetProducts
