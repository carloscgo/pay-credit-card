import { SVGProps, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../store'
import { TStatePayment, setCurrentStep } from '../../store/slices/payment.slice'
import { StatusTransaction } from '../../hooks/usePayment'
import routes from '../../utils/routes'
import Button from '../Button'

type IconProps = SVGProps<SVGSVGElement> & {
  [key: string]: string
}

const CheckCircleIcon = (props: IconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
)

const ExclamationCircleIcon = (props: IconProps) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
    />
  </svg>
)

const Result = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { transaction } = useSelector(
    (state: RootState) => state.payment
  ) as TStatePayment

  useEffect(() => {
    dispatch(setCurrentStep(4))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!transaction?.id) {
      navigate(routes.home, {
        replace: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction])

  if (!transaction?.id) {
    return null
  }

  const onClickEvent = (route: string) => () => {
    navigate(route, {
      replace: true,
    })
  }

  const statusDetails = {
    [StatusTransaction.success]: {
      icon: CheckCircleIcon,
      textColor: 'text-green-500',
      iconStyle: 'text-green-500',
      labelButton: 'Keep buying',
      route: routes.products,
    },
    [StatusTransaction.error]: {
      icon: ExclamationCircleIcon,
      textColor: 'text-red-500',
      iconStyle: 'text-red-500',
      labelButton: 'Try again payment',
      route: routes.payment,
    },
  }

  const {
    icon: StatusIcon,
    textColor,
    iconStyle,
    labelButton,
    route,
  } = statusDetails[transaction.status]

  const isErrorTx = transaction.status === StatusTransaction.error

  return (
    <div className="flex flex-col items-center justify-center p-4 m-4 border rounded shadow-lg">
      <div className="flex flex-col items-center space-x-2">
        {StatusIcon && (
          <StatusIcon className={`h-[100px] w-[100px] m-[20px] ${iconStyle}`} />
        )}
        <span className="text-gray-700">
          Transaction ID: <b>{transaction.id}</b>
        </span>
      </div>
      <div
        className={`flex items-center my-[20px] text-lg font-semibold first-letter:capitalize ${textColor}`}
      >
        {transaction.status} {isErrorTx ? ` - ${transaction.messageError}` : ''}
      </div>

      <div className="flex items-center justify-between my-4">
        <Button as="button" onClick={onClickEvent(route)}>
          {labelButton}
        </Button>
      </div>
    </div>
  )
}

export default Result
