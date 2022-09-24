export interface LinkProps {
  href: string
  icon: JSX.Element
}

export const Link: React.FC<LinkProps> = (props) => {
  const { href, icon } = props

  return (
    <a
      className="text-3xl dark:text-gray-300 dark:hover:text-indigo-400"
      target="_blank"
      href={href}
    >
      {icon}
    </a>
  )
}
