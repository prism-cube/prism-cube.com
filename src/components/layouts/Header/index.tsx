import { useState } from 'react'

export const menuItems = [
  {
    name: 'Timeline',
    href: '/timeline',
  },
  {
    name: 'Articles',
    href: '/articles',
  },
  {
    name: 'Works',
    href: '/works',
  },
  {
    name: 'Profile',
    href: '/profile',
  },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <nav className="relative">
      <div className="container mx-auto p-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <div>
            <a
              className="transform text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-2xl"
              href="/"
            >
              <div className="mr-2 inline-block h-4 w-4 rounded bg-gradient-to-tl from-gray-900 via-purple-900 to-violet-600"></div>
              <span>PrismCube</span>
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={toggle}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6${isOpen && ' hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6${!isOpen && ' hidden'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-ashen-900 md:relative md:top-0 md:mt-0 md:flex md:w-auto md:translate-x-0 md:items-center md:bg-transparent md:p-0 md:opacity-100 ${
            isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="flex flex-col md:ml-6 md:flex-row">
            {menuItems.map((item) => (
              <a
                key={item.name}
                className="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                href={item.href}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
