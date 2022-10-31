import Link from 'next/link'

export interface LinkProps {
  href: string
  icon: JSX.Element
}

export const IconLink: React.FC<LinkProps> = (props) => {
  const { href, icon } = props

  return (
    <Link
      className="text-3xl dark:text-gray-300 dark:hover:text-indigo-400"
      target="_blank"
      href={href}
    >
      {icon}
    </Link>
  )
}
