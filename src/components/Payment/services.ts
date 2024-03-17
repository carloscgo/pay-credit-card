import { FormEvent, RefObject } from 'react'
import getCardType from '../../utils/detectTypeCreditCard'

export type TRef = RefObject<HTMLInputElement & HTMLDivElement>

/* eslint-disable @typescript-eslint/no-explicit-any */
export const flipCardHandler = (flip: string, creditCardRef: TRef) => () => {
  const cardEl = creditCardRef.current

  if (flip === 'flipToRear' && !cardEl?.classList.contains('backIsVisible')) {
    cardEl?.classList.add('backIsVisible')
  }
  if (flip === 'flipToFront' && cardEl?.classList.contains('backIsVisible')) {
    cardEl?.classList.remove('backIsVisible')
  }
  if (flip === 'flip') {
    if (cardEl?.classList.contains('backIsVisible')) {
      cardEl?.classList.remove('backIsVisible')
    } else {
      cardEl?.classList.add('backIsVisible')
    }
  }
}

export const onInputCardHandler = (
  event: FormEvent<HTMLInputElement>,
  updateCreditCardData: any
): void => {
  const input = (event.target as HTMLInputElement).value.replace(/\D/g, '')

  const typeCard = getCardType(input)

  updateCreditCardData('type', typeCard as string)

  // Add a space after every 4 digits
  let formattedInput = ''

  for (let i = 0; i < input.length; i++) {
    if (i % 4 === 0 && i > 0) {
      formattedInput += ' '
    }

    formattedInput += input[i]
  }

  updateCreditCardData('numberCard', formattedInput)
}

export const onInputCVVHandler = (
  event: FormEvent<HTMLInputElement>,
  updateCreditCardData: any
): void => {
  const input = (event.target as HTMLInputElement).value.replace(/\D/g, '')

  updateCreditCardData('ccv', input)
}

export const onInputExpiredHandler = (
  event: FormEvent<HTMLInputElement>,
  updateCreditCardData: any
): void => {
  const input = (event.target as HTMLInputElement).value.replace(/\D/g, '')

  // Add a '/' after the first 2 digits
  let formattedInput = ''

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0 && i > 0) {
      formattedInput += '/'
    }

    formattedInput += input[i]
  }

  updateCreditCardData('expireDate', formattedInput)
}

export const onInputNameHandler = (
  event: FormEvent<HTMLInputElement>,
  updateCreditCardData: any
): void => {
  const input = (event.target as HTMLInputElement).value

  updateCreditCardData('holderName', input)
}
