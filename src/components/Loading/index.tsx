export type LoadingProps = {
  isLoading: boolean
}

const Loading = ({ isLoading }: LoadingProps) => {
  if (!isLoading) return null

  return (
    <div
      data-testid="loading"
      className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  )
}

export default Loading
