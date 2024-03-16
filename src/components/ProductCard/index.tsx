import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../Button'
import { fillPayment } from '../../store/slices/payment.slice'
import routes from '../../utils/routes'
import formatNumber from '../../utils/formatNumber'

export type ProductCardProps = {
  id: number
  name: string
  price: number
  image: string
}

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSelect = () => {
    dispatch(
      fillPayment({
        product: {
          id,
          name,
          price,
          image,
        },
      })
    )

    navigate(routes.payment)
  }

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <div className="w-100 h-[300px]">
        <img
          className="p-8 rounded-t-lg m-auto image-product"
          src={image}
          alt={name}
        />
      </div>

      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
            {name}
          </h5>
        </a>

        <div className="flex items-center justify-between mt-4">
          <span className="text-3xl font-bold text-gray-900 ">
            {formatNumber(price)}
          </span>

          <Button as="button" onClick={onSelect}>
            Buy now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
