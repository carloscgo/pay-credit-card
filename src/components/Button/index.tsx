type ButtonAsProps<E extends React.ElementType> = {
  as?: E
  href?: string
} & React.ComponentPropsWithoutRef<E>

const Button = <E extends React.ElementType>({
  as,
  href,
  ...props
}: ButtonAsProps<E>) => {
  // Conditionally set the Component based on the 'as' prop value
  const Component: React.ElementType = as || 'button'

  // Render as 'a' tag if 'href' is provided, otherwise render as 'button'
  return (
    <Component
      {...(Component === 'a' ? { href } : {})} // Spread 'href' only for 'a' elements
      className={`text-white ${
        props.disabled ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800'
      }  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      {...props} // Spread the rest of the props
    >
      {props.children}
    </Component>
  )
}

export default Button
