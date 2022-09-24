export interface PlatformAreaProps {
  platform: string[]
}

export const PlatformArea: React.FC<PlatformAreaProps> = (props) => {
  const { platform } = props

  return (
    <div className="flex justify-center space-x-2 pb-3">
      {platform.map((p) => (
        <span
          key={p}
          className="rounded px-2 py-1 text-sm dark:bg-indigo-900 dark:text-gray-300"
        >
          {p}
        </span>
      ))}
    </div>
  )
}
