import { MouseEventHandler } from 'react'

export type ErrorMessageProps = {
  errorMessage: string
  onClose: MouseEventHandler<HTMLButtonElement>
}

const ErrorMessage = ({ errorMessage, onClose }: ErrorMessageProps) => {
  if (!errorMessage) return null

  return (
    <div className="fixed inset-0 bg-red-100 bg-opacity-75 z-50 flex justify-center items-center">
      <div className="p-4 max-w-lg w-[100%] mx-auto bg-white rounded-lg border shadow-md sm:p-6 lg:p-8">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl">
            Error
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="popup-modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">{errorMessage}</p>
      </div>
    </div>
  )
}

export default ErrorMessage
