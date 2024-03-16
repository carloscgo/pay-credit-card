import useGetProducts from '../../hooks/useGetProducts'
import ProductCard, { ProductCardProps } from '../ProductCard'

export type ProductsProps = {
  products: ProductCardProps[]
}

const Products = () => {
  const { products }: ProductsProps = useGetProducts()

  return (
    <div className="flex flex-wrap justify-center gap-[50px]">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

export default Products
