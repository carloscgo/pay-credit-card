import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { TStatePayment } from '../../store/slices/payment.slice'

const steps = ['Product', 'Credit Card Info', 'Summary', 'Final Status']

const StepBar = () => {
  const { currentStep } = useSelector(
    (state: RootState) => state.payment
  ) as TStatePayment

  return (
    <div className="w-[100%] py-4 md:px-[30px] px-0">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep

          return (
            <Fragment key={step}>
              {/* Step Indicator */}
              <div
                className={`flex items-center justify-center ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {isActive && (
                  <div className="rounded-full bg-blue-600 p-2 lg:w-9 w-4 md:text-sm text-xs flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                )}
                {!isActive && (
                  <span className="p-2 lg:w-9 w-4 md:text-sm text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                )}
                <span className="ml-2 md:text-sm text-xs">{step}</span>
              </div>
              {/* Connecting line (except for the last step) */}
              {index < steps.length - 1 && (
                <div
                  className={`md:flex hidden flex-auto border-t-2 lg:mx-6 mx-3 transition duration-500 ease-in-out ${
                    isActive || index < currentStep - 1
                      ? 'border-blue-600'
                      : 'border-gray-300'
                  }`}
                ></div>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default StepBar
