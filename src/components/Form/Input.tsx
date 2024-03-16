import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { IFormValues } from '../Payment'

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  UseFormRegister<IFormValues> &
  ReturnType<UseFormRegister<IFormValues>> & {
    error?: string
  }

const Input = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <>
        <input
          className={`flex h-10 w-full rounded-md border-2 px-4 py-1.5 text-lg ring-offset-background focus-visible:outline-none ${
            props.error
              ? 'border-red-400 focus-visible:border-red-400'
              : 'focus-visible:border-purple-600'
          }  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4`}
          {...props}
          ref={ref}
          aria-invalid={props.error ? 'true' : 'false'}
        />
        {props.error && (
          <p role="alert" className="relative bottom-4 text-xs text-red-400">
            {props.error}
          </p>
        )}
      </>
    )
  }
)

export default Input
