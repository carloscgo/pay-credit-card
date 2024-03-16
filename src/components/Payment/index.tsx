import {
  FormEvent,
  FormEventHandler,
  MouseEvent,
  MouseEventHandler,
  useRef,
  useState,
} from 'react'
import getCardType from '../../utils/detectTypeCreditCard'
import { CreditCard, CreditCardProps } from '../CreditCard'

const Payment = () => {
  const creditCardRef = useRef<HTMLDivElement>(null)
  const inputCardNumberRef = useRef<HTMLInputElement>(null)
  const inputCCVNumberRef = useRef<HTMLInputElement>(null)
  const expirationDateRef = useRef<HTMLInputElement>(null)
  const inputCardName = useRef<HTMLInputElement>(null)
  const [creditCardData, setCreditCardData] = useState<CreditCardProps>({
    type: null,
    numberCard: '',
    holderName: '',
    expireDate: '',
    ccv: '',
  })

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
    setCreditCardData((state: CreditCardProps) => {
      if (state) {
        return { ...state, [key]: value }
      }

      return state
    })
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

    if (inputCardNumberRef.current) {
      inputCardNumberRef.current.value = formattedInput

      updateCreditCardData('numberCard', formattedInput)
    }
  }

  const onInputCVV: FormEventHandler<HTMLInputElement> = (
    event: FormEvent<HTMLInputElement>
  ): void => {
    const input = (event.target as HTMLInputElement).value.replace(/\D/g, '')

    if (inputCCVNumberRef.current) {
      inputCCVNumberRef.current.value = input

      updateCreditCardData('ccv', input)
    }
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

    if (expirationDateRef.current) {
      expirationDateRef.current.value = formattedInput

      updateCreditCardData('expireDate', formattedInput)
    }
  }

  const onInputName: FormEventHandler<HTMLInputElement> = (
    event: FormEvent<HTMLInputElement>
  ): void => {
    const input = (event.target as HTMLInputElement).value

    if (inputCardName.current) {
      inputCardName.current.value = input

      updateCreditCardData('holderName', input)
    }
  }

  return (
    <form className="bg-white w-full max-w-3xl mx-auto px-6 py-8 shadow-md rounded-md flex">
      <div className="w-1/2 pr-8 border-r-2 border-slate-300">
        <label className="text-neutral-800 font-bold text-sm mb-2 block">
          Card number:
        </label>
        <input
          type="text"
          className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
          ref={inputCardNumberRef}
          onClick={flipCard('flipToFront')}
          onInput={onInputCard}
          maxLength={19}
          placeholder="XXXX XXXX XXXX XXXX"
        />
        <div className="flex gap-x-2 mb-4">
          <div className="flex-1">
            <label className="text-neutral-800 font-bold text-sm mb-2 block">
              Exp. date:
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
              ref={expirationDateRef}
              onClick={flipCard('flipToFront')}
              onInput={onInputExpired}
              maxLength={5}
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label className="text-neutral-800 font-bold text-sm mb-2 block">
              CCV:
            </label>
            <input
              type="text"
              className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
              ref={inputCCVNumberRef}
              onClick={flipCard('flipToRear')}
              onInput={onInputCVV}
              maxLength={3}
              placeholder="123"
            />
          </div>
        </div>

        <label className="text-neutral-800 font-bold text-sm mb-2 block">
          Card holder:
        </label>
        <input
          type="text"
          className="flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none focus-visible:border-purple-600 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={inputCardName}
          onClick={flipCard('flipToFront')}
          onInput={onInputName}
          placeholder="John Doe"
        />
      </div>
      <div className="w-1/2 pl-8 pt-8">
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
                type={creditCardData.type}
                numberCard={creditCardData.numberCard}
                holderName={creditCardData.holderName}
                expireDate={creditCardData.expireDate}
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
                    {creditCardData.ccv}
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
