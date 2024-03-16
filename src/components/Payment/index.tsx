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
import { Input, Label } from '../Form'

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
    <form className="bg-white mx-auto px-6 py-8 shadow-md rounded-md flex flex-wrap">
      <div className="w-full md:w-1/2 lg:pr-8 md:pr-0 lg:border-r-2 md:border-r-0 md:border-0 lg:border-slate-300">
        <Label>Card number:</Label>
        <Input
          type="text"
          ref={inputCardNumberRef}
          onClick={flipCard('flipToFront')}
          onInput={onInputCard}
          maxLength={19}
          placeholder="XXXX XXXX XXXX XXXX"
        />
        <div className="flex gap-x-2 mb-4">
          <div className="flex-1">
            <Label>Exp. date:</Label>
            <Input
              ref={expirationDateRef}
              type="text"
              onClick={flipCard('flipToFront')}
              onInput={onInputExpired}
              maxLength={5}
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <Label>CCV:</Label>
            <Input
              ref={inputCCVNumberRef}
              type="text"
              onClick={flipCard('flipToRear')}
              onInput={onInputCVV}
              maxLength={3}
              placeholder="123"
            />
          </div>
        </div>

        <Label>Card holder:</Label>
        <Input
          ref={inputCardName}
          type="text"
          onClick={flipCard('flipToFront')}
          onInput={onInputName}
          placeholder="John Doe"
        />
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
