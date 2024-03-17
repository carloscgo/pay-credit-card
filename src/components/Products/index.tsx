import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useGetProducts from '../../hooks/useGetProducts'
import ProductCard, { ProductCardProps } from '../ProductCard'
import { reset, setCurrentStep } from '../../store/slices/payment.slice'

export type ProductsProps = {
  products: ProductCardProps[]
}

const Products = () => {
  const dispatch = useDispatch()

  const { products }: ProductsProps = useGetProducts()

  useEffect(() => {
    dispatch(setCurrentStep(1))
    dispatch(reset())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-[50px]">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

export default Products
