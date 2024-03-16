import {
  FormEvent,
  FormEventHandler,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import getCardType from '../../utils/detectTypeCreditCard'
import {
  TStatePayment,
  fillPayment,
  setCurrentStep,
} from '../../store/slices/payment.slice'
import { CreditCard, CreditCardProps, TypeCard } from '../CreditCard'
import { Input, Label } from '../Form'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import routes from '../../utils/routes'

export interface IFormValues {
  type: string
  numberCard: string
  holderName: string
  expireDate: string
  ccv: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const schema = yup
  .object({
    type: yup.string().required(),
    numberCard: yup
      .string()
      .required('Number card is required.')
      .when('type', (type: string[], schema) => {
        const validations = {
          diners: schema.max(17, 'Diners card must be at most 14 digits long.'),
          amex: schema.max(18, 'Amex card must be at most 15 digits long.'),
        }[type[0]?.toLowerCase()]

        return (
          validations || schema.max(19, 'Card must be at most 16 digits long.')
        )
      }),
    holderName: yup.string().max(50).required('Card holder is required.'),
    expireDate: yup
      .string()
      .min(5, 'Exp. date must be 4 characters')
      .max(5)
      .required('Exp. date card is required.'),
    ccv: yup
      .string()
      .min(3, 'CCV must be 3 characters')
      .max(3)
      .required('CCV card is required.'),
  })
  .required()

const Payment = () => {
  const navigate = useNavigate()

  const { product } = useSelector(
    (state: RootState) => state.payment
  ) as TStatePayment

  const dispatch = useDispatch()

  const creditCardRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<IFormValues>({
    defaultValues: {
      type: '',
      numberCard: '',
      holderName: '',
      expireDate: '',
      ccv: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(setCurrentStep(2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!product?.id) {
      navigate(routes.home, {
        replace: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  if (!product?.id) {
    return null
  }

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    dispatch(
      fillPayment({
        creditCard: data,
      })
    )

    navigate(routes.summary, {
      replace: true,
    })
  }

  const flipCard =
    (flip: string): MouseEventHandler<HTMLInputElement> =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_event: MouseEvent<HTMLInputElement>) => {
      const cardEl = creditCardRef.current

      if (
        flip === 'flipToRear' &&
        !cardEl?.classList.contains('backIsVisible')
      ) {
        cardEl?.classList?.add('backIsVisible')
      }
      if (
        flip === 'flipToFront' &&
        cardEl?.classList.contains('backIsVisible')
      ) {
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

  const updateCreditCardData = (key: keyof CreditCardProps, value: string) => {
    setValue(key as keyof IFormValues, value)
  }

  const onInputCard: FormEventHandler<HTMLInputElement> = (
    event: FormEvent<HTMLInputElement>
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

  const onInputCVV: FormEventHandler<HTMLInputElement> = (
    event: FormEvent<HTMLInputElement>
  ): void => {
    const input = (event.target as HTMLInputElement).value.replace(/\D/g, '')

    updateCreditCardData('ccv', input)
  }

  const onInputExpired: FormEventHandler<HTMLInputElement> = (
    event: FormEvent<HTMLInputElement>
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

  const onInputName: FormEventHandler<HTMLInputElement> = (
    event: FormEvent<HTMLInputElement>
  ): void => {
    const input = (event.target as HTMLInputElement).value

    updateCreditCardData('holderName', input)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white mx-auto px-6 py-8 shadow-md rounded-md flex flex-wrap"
    >
      <div className="w-full md:w-1/2 lg:pr-8 md:pr-0 lg:border-r-2 md:border-r-0 md:border-0 lg:border-slate-300">
        <Label>Card number:</Label>
        <Input
          {...register('numberCard')}
          type="text"
          onClick={flipCard('flipToFront')}
          onInput={onInputCard}
          error={errors.numberCard?.message}
          maxLength={19}
          placeholder="XXXX XXXX XXXX XXXX"
          required
        />
        <div className="flex gap-x-2 mb-4">
          <div className="flex-1">
            <Label>Exp. date:</Label>
            <Input
              {...register('expireDate')}
              type="text"
              onClick={flipCard('flipToFront')}
              onInput={onInputExpired}
              error={errors.expireDate?.message}
              maxLength={5}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="flex-1">
            <Label>CCV:</Label>
            <Input
              {...register('ccv')}
              type="text"
              onClick={flipCard('flipToRear')}
              onInput={onInputCVV}
              error={errors.ccv?.message}
              maxLength={3}
              placeholder="123"
              required
            />
          </div>
        </div>

        <Label>Card holder:</Label>
        <Input
          {...register('holderName')}
          type="text"
          onClick={flipCard('flipToFront')}
          onInput={onInputName}
          error={errors.holderName?.message}
          maxLength={50}
          placeholder="John Doe"
          required
        />

        <div className="mt-2">
          <Button as="button" type="submit" disabled={!isValid}>
            Pay now
          </Button>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:pl-8 pt-8 md:pl-0">
        <div className="w-full h-56" style={{ perspective: '1000px' }}>
          <div
            ref={creditCardRef}
            className="creditCard relative cursor-pointer transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d' }}
            onClick={flipCard('flip')}
          >
            <div
              className="w-full m-auto rounded-xl shadow-2xl absolute"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <CreditCard
                className="relative object-cover w-full h-full rounded-xl"
                type={getValues().type as TypeCard}
                numberCard={getValues().numberCard}
                holderName={getValues().holderName}
                expireDate={getValues().expireDate}
              />
            </div>
            <div
              className="w-full m-auto rounded-xl shadow-2xl absolute"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <img
                src="/creditCardBack.png"
                className="relative object-cover w-full h-full rounded-xl"
              />

              <div className="w-full absolute top-8">
                <div className="px-8 mt-12">
                  <p
                    id="imageCCVNumber"
                    className="text-black flex items-center pl-4 pr-2 w-14 ml-auto"
                  >
                    {getValues().ccv}
                  </p>
                  <p className="text-white font-light flex justify-end text-sm mt-2">
                    security code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Payment
