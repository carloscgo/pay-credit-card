import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { TStatePayment } from '../../store/slices/payment.slice'
import routes from '../../utils/routes'
import Button from '../Button'
import usePayment from '../../hooks/usePayment'
import formatNumber from '../../utils/formatNumber'

const Summary = () => {
  const navigate = useNavigate()

  const { product, creditCard } = useSelector(
    (state: RootState) => state.payment
  ) as TStatePayment

  const completePay = usePayment({
    product,
    creditCard,
  })

  useEffect(() => {
    if (!product?.id || !creditCard?.numberCard) {
      navigate(routes.home, {
        replace: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, creditCard])

  if (!product?.id || !creditCard?.numberCard) {
    return null
  }

  const onClickEvent = async () => {
    await completePay()

    navigate(routes.result, {
      replace: true,
    })
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h1 className="text-2xl font-semibold leading-tight mb-4">
        Order Summary
      </h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Credit Card Information</h2>
        <p>Holder Name: {creditCard.holderName}</p>
        <p>Card Number: **** **** **** {creditCard.numberCard.slice(-4)}</p>
        <p>Expiry Date: {creditCard.expireDate}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Product Information</h2>
        <p>Product Name: {product.name}</p>
        <p>Price: {formatNumber(product.price)}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button as="button" onClick={onClickEvent}>
          Complete payment
        </Button>
      </div>
    </div>
  )
}

export default Summary
