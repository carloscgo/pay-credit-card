import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { AppDispatch } from '../store'
import { fillPayment } from '../store/slices/payment.slice'
import { IFormValues } from '../components/Payment'

import { creditCards } from '../mock/creditCards'
import { ProductCardProps } from '../components/ProductCard'

export type usePaymentProps = {
  creditCard: Omit<IFormValues, 'type'>
  product: ProductCardProps
}

export enum StatusTransaction {
  success = 'Success',
  error = 'Error',
}

export const executePayment = async (
  dispatch: AppDispatch,
  { creditCard, product }: usePaymentProps
) => {
  return new Promise((resolve, reject) => {
    const isValid = creditCards.includes(
      +`${creditCard.numberCard}`.replace(/\s+/g, '')
    )

    setTimeout(() => {
      dispatch(
        fillPayment({
          transaction: {
            id: uuidv4(),
            time: new Date().toDateString(),
            status: StatusTransaction[isValid ? 'success' : 'error'],
            messageError: isValid ? null : 'Payment invalid.',
            creditCard,
            product,
          },
        })
      )

      if (isValid) {
        resolve('Payment successfully')
      } else {
        reject(new Error('Payment invalid.'))
      }
    }, 2000)
  })
}

const usePayment = ({ creditCard, product }: usePaymentProps) => {
  const dispatch = useDispatch()

  return () =>
    executePayment(dispatch, {
      creditCard,
      product,
    }).catch((err) => console.error(err.message))
}

export default usePayment
