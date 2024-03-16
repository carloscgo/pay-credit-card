import { ReactNode } from 'react'

const Label = ({ children }: { children: ReactNode }) => {
  return (
    <label className="text-neutral-800 font-bold text-sm mb-2 block">
      {children}
    </label>
  )
}

export default Label
